"use client";

import { GoalCellRenderer, Grid } from "@/components";
import { useDailyGaols, useGoalsInfo } from "@/contexts";
import { DailyGoalsRow } from "@/types";
import { dateFromGoogleDate } from "@/utils";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";

export default function Home() {
  const goals = useGoalsInfo();
  const dailyGoals = useDailyGaols();

  const columnDefs = useMemo<ColDef<DailyGoalsRow>[]>(
    () => [
      {
        headerName: "Date",
        sortable: true,
        initialSort: "desc",
        sortingOrder: ["asc", "desc"],
        cellDataType: "date",
        valueGetter: ({ data }) => data && dateFromGoogleDate(data.Date),
      },
      ...goals.map<ColDef<DailyGoalsRow>>((goal) => ({
        headerName: goal.Goal,
        headerComponentParams: { goal },
        valueGetter: ({ data }) =>
          data &&
          dateFromGoogleDate(goal["Starting date"]) <=
            dateFromGoogleDate(data.Date)
            ? data[goal.Goal]
            : null,
        cellRenderer: GoalCellRenderer,
        sortable: false,
      })),
    ],
    [goals]
  );

  return (
    <Grid<DailyGoalsRow>
      columnDefs={columnDefs}
      getRowId={({ data }) => data.Date}
      rowData={dailyGoals}
    />
  );
}
