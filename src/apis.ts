import { SHEET_ID, SheetName } from "@/constants";
import { DailyGoals, GoalInfo } from "@/types";
import { isNil, Nullable } from "@yamori-shared/react-utilities";

const GOOGLE_SHEETS_RESPONSE_REG_EX = /setResponse\(({.*})\)/;

type GoogleSheetResponse = {
  table: {
    cols: Array<{ id: string; label: string; type: string }>;
    rows: Array<{
      c: Array<{ v: Nullable<string | boolean> } | null>;
    }>;
  };
};

function parseGoogleSheetRowValue(rowValue: string | boolean) {
  if (typeof rowValue === "boolean" || !rowValue.startsWith("Date("))
    return rowValue;

  const [year, month, day] = rowValue
    .slice("Date(".length, -1)
    .split(",")
    .map((val) => parseInt(val, 10));

  return new Date(year, month, day);
}

async function parseGoogleSheetResponse(
  response: Response
): Promise<Array<any>> {
  const googleResponse = await response
    .text()
    .then(
      (res) =>
        JSON.parse(
          GOOGLE_SHEETS_RESPONSE_REG_EX.exec(res)![1]
        ) as GoogleSheetResponse
    );

  const columns = googleResponse.table.cols
    .filter(({ label }) => !!label)
    .map(({ label }) => label);

  const rows = googleResponse.table.rows.map((row) =>
    row.c.filter(
      (colRow): colRow is { v: string | boolean } =>
        !isNil(colRow) && !isNil(colRow.v)
    )
  );

  return rows.map((row) =>
    row.reduce(
      (ret, curr, currIdx) => ({
        ...ret,
        [columns[currIdx]]: parseGoogleSheetRowValue(curr.v),
      }),
      {}
    )
  );
}

export function getDailyGoals(): Promise<DailyGoals[]> {
  return fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SheetName.Tracker}`
  ).then(parseGoogleSheetResponse);
}

export function getGoalsInfo(): Promise<GoalInfo[]> {
  return fetch(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SheetName.Goals}`
  ).then<GoalInfo[]>(parseGoogleSheetResponse);
}
