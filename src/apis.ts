import PublicGoogleSheetsParser from 'public-google-sheets-parser';

import { SHEET_ID } from './constants';
import { DailyGoalsRow } from './types';

const parser = new PublicGoogleSheetsParser(SHEET_ID, { useFormattedDate: true });

export async function getDailyGoals(): Promise<{
  goals: Array<string>;
  rows: Array<DailyGoalsRow>;
}> {
  return parser.parse().then((rows: Array<DailyGoalsRow>) => ({
    goals: Object.keys(rows[0]).filter((key) => key !== 'Date'),
    rows,
  }));
}
