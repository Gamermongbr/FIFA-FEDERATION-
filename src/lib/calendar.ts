import { Match } from '../types';
import { getAccessToken } from './firebase';

function getReminderMinutes(startDate: Date): number {
  // IST is UTC + 5:30
  const istOffset = 5.5 * 60 * 60 * 1000;
  const pseudoIST = new Date(startDate.getTime() + istOffset);
  
  const pseudoReminder = new Date(pseudoIST.getTime());
  if (pseudoIST.getUTCHours() < 12) {
    // If match is morning/late night (e.g., 1:30 AM), reminder at 9 PM previous day
    pseudoReminder.setUTCDate(pseudoReminder.getUTCDate() - 1);
    pseudoReminder.setUTCHours(21, 0, 0, 0); 
  } else {
    // If match is afternoon/evening (e.g., 6:30 PM), reminder at 9 AM same day
    pseudoReminder.setUTCHours(9, 0, 0, 0); 
  }
  
  const diffMinutes = Math.round((pseudoIST.getTime() - pseudoReminder.getTime()) / 60000);
  return diffMinutes > 0 ? diffMinutes : 60; // Fallback to 60 if negative
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m}M`;
}

export function downloadIcsFile(match: Match) {
  const startDate = new Date(match.date);
  const endDate = new Date(startDate.getTime() + 120 * 60 * 1000);
  const diff9AM = getReminderMinutes(startDate);

  const formatIcsDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const ics = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FIFA 26 IST Hub//Match Center//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:match-${match.id}-${startDate.getTime()}@fifa26ist.com
DTSTAMP:${formatIcsDate(new Date())}
DTSTART:${formatIcsDate(startDate)}
DTEND:${formatIcsDate(endDate)}
SUMMARY:FIFA 26: ${match.team1} vs ${match.team2}
DESCRIPTION:Match ${match.id} - ${match.round}\\nStadium: ${match.venue}\\nOfficial FIFA 2026 IST Center Reminder
LOCATION:${match.venue}, ${match.city}, ${match.country}
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Match starts in 30 minutes!
TRIGGER:-${formatDuration(30)}
END:VALARM
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Match reminder!
TRIGGER:-${formatDuration(diff9AM)}
END:VALARM
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `FIFA26_Match_${match.id}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarIntentUrl(match: Match): string {
  const startDate = new Date(match.date);
  const endDate = new Date(startDate.getTime() + 120 * 60 * 1000);

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatGoogleDate(startDate);
  const end = formatGoogleDate(endDate);

  const istOffset = 5.5 * 60 * 60 * 1000;
  const pseudoIST = new Date(startDate.getTime() + istOffset);
  const reminderTime = pseudoIST.getUTCHours() < 12 ? '9:00 PM (Previous Day)' : '9:00 AM';

  const title = encodeURIComponent(`FIFA 26: ${match.team1} vs ${match.team2}`);
  const detailsStr = `Match ${match.id} - ${match.round}\nStadium: ${match.venue}\nOfficial FIFA 2026 IST Center.\n\nRecommended Reminders to set manually:\n- 30 minutes before kickoff\n- ${reminderTime} IST`;
  const details = encodeURIComponent(detailsStr);
  const location = encodeURIComponent(`${match.venue}, ${match.city}, ${match.country}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export async function addMatchToCalendar(match: Match): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No access token found. Please sign in.');
  }

  const startDate = new Date(match.date);
  const endDate = new Date(startDate.getTime() + 120 * 60 * 1000);
  const diff9AM = getReminderMinutes(startDate);

  const event = {
    summary: `FIFA 26: ${match.team1} vs ${match.team2}`,
    location: `${match.venue}, ${match.city}, ${match.country}`,
    description: `Match ${match.id} - ${match.round}\nStadium: ${match.venue}\nOfficial FIFA 2026 IST Center Reminder`,
    start: {
      dateTime: startDate.toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'UTC',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 30 },
        { method: 'popup', minutes: diff9AM },
      ],
    },
  };

  const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Calendar API Error:', error);
    throw new Error(error.error?.message || 'Failed to add event to calendar');
  }

  const data = await response.json();
  return data.htmlLink;
}
