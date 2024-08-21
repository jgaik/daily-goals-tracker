import PublicGoogleSheetsParser from 'public-google-sheets-parser';

import { SHEET_ID } from '@/constants';
import { DailyGoalsRow } from '@/types';

const parser = new PublicGoogleSheetsParser(SHEET_ID, {
  useFormattedDate: true,
});

export const GET = {
  dailyGoals: (): Promise<DailyGoalsRow[]> => parser.parse(SHEET_ID),
  goalsInfo: (): Promise<any[]> => parser.parse(SHEET_ID, 'Completion'),
} as const;
