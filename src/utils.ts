export function dateFromGoogleDate(dateString: string): Date {
  const googleDateRegex = /Date\((?<year>\d+),(?<month>\d+),(?<day>\d+)\)/;

  const date = new Date(
    dateString.replace(googleDateRegex, "$<year>-$<month>-$<day>")
  );

  // Google Sheets uses 0-indexed months
  date.setMonth(date.getMonth() + 1);

  return date;
}
