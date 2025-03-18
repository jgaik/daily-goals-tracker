export function dateFromGoogleDate(dateString: string): Date {
  const [year, month, day] = dateString.slice("Date(".length, -1).split(",");

  return new Date(`${year}-${parseInt(month, 10) + 1}-${day}`);
}
