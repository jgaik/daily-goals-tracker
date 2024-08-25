import { SHEET_ID, SheetName } from '@/constants';
import { DailyGoalsRow, GoalInfo, Nullable } from '@/types';
import { isNil } from '@/utils';

const GOOGLE_SHEETS_RESPONSE_REG_EX = /setResponse\(({.*})\)/;

type GoogleSheetResponse = {
  table: {
    cols: Array<{ id: string; label: string; type: string }>;
    rows: Array<{
      c: Array<{ f?: string; v: Nullable<string | boolean> } | null>;
    }>;
  };
};

async function parseGoogleSheetResponse(
  response: Response
): Promise<Array<any>> {
  const googleResponse = await response
    .text()
    .then(
      (res) =>
        JSON.parse(
          res.match(GOOGLE_SHEETS_RESPONSE_REG_EX)![1]
        ) as GoogleSheetResponse
    );

  const columns = googleResponse.table.cols
    .filter(({ label }) => !!label)
    .map(({ label }) => label);

  const rows = googleResponse.table.rows.map((row) =>
    row.c.filter(
      (colRow): colRow is { f?: string; v: string | boolean } =>
        !isNil(colRow) && !isNil(colRow.v)
    )
  );

  return rows.map((row) =>
    row.reduce(
      (ret, curr, currIdx) => ({
        ...ret,
        [columns[currIdx]]: curr.f ?? curr.v,
      }),
      {}
    )
  );
}

export const GET = {
  dailyGoals: (): Promise<DailyGoalsRow[]> =>
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`).then(
      parseGoogleSheetResponse
    ),
  goalsInfo: (): Promise<GoalInfo[]> =>
    fetch(
      `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SheetName.Completion}`
    )
      .then<GoalInfo[]>(parseGoogleSheetResponse)
      .then((res) => res.filter((goal) => !!goal['Starting date'])),
} as const;
