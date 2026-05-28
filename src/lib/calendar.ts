import { Match } from '../types';
import { getAccessToken } from './firebase';

export function getGoogleCalendarIntentUrl(match: Match): string {
  const startDate = new Date(match.date);
  const endDate = new Date(startDate.getTime() + 120 * 60 * 1000);

  const formatGoogleDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  const start = formatGoogleDate(startDate);
  const end = formatGoogleDate(endDate);

  const title = encodeURIComponent(`FIFA 26: ${match.team1} vs ${match.team2}`);
  const details = encodeURIComponent(`Match ${match.id} - ${match.round}\nStadium: ${match.venue}\nOfficial FIFA 2026 IST Center Reminder`);
  const location = encodeURIComponent(`${match.venue}, ${match.city}, ${match.country}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export async function addMatchToCalendar(match: Match): Promise<string> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('No access token found. Please sign in.');
  }

  const startDate = new Date(match.date);
  // Match duration: 2 hours (90 mins + halftime + buffer)
  const endDate = new Date(startDate.getTime() + 120 * 60 * 1000);

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
        { method: 'email', minutes: 60 },
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
