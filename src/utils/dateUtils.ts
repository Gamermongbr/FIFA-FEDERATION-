export function formatIST(isoString: string) {
  const date = new Date(isoString);
  const optionsDate: Intl.DateTimeFormatOptions = { 
    timeZone: 'Asia/Kolkata', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  const optionsTime: Intl.DateTimeFormatOptions = { 
    timeZone: 'Asia/Kolkata', 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true 
  };
  
  return {
    date: date.toLocaleDateString('en-IN', optionsDate),
    time: date.toLocaleTimeString('en-IN', optionsTime)
  };
}
