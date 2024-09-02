import type { Nullable } from './types';

export function getTypedObjectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

export function isNil<T>(value: Nullable<T>): value is null | undefined {
  return value === null || value === undefined;
}

export function nilFilter<T>(value: Nullable<T>): value is T {
  return !isNil(value);
}

export function dateFromGoogleDate(dateString: string): Date {
  const googleDateRegex = /Date\((?<year>\d+),(?<month>\d+),(?<day>\d+)\)/;

  const date = new Date(
    dateString.replace(googleDateRegex, '$<year>-$<month>-$<day>')
  );

  // Google Sheets uses 0-indexed months
  date.setMonth(date.getMonth() + 1);

  return date;
}
