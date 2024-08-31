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

export function dateFromGoogleDate(date: string): Date {
  const googleDateRegex = /Date\((?<year>\d+),(?<month>\d+),(?<day>\d+)\)/;

  return new Date(date.replace(googleDateRegex, '$<year>-$<month>-$<day>'));
}
