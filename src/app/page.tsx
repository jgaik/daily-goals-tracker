"use client";

import { GoalCellRenderer, Grid } from "@/components";
import { useApiData } from "@/contexts";
import { DailyGoals } from "@/types";
import { dateFromGoogleDate } from "@/utils";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";

export default function Home() {
  const { dailyGoals, goalsInfo } = useApiData();

  const columnDefs = useMemo<ColDef<DailyGoals>[]>(
    () => [
      {
        headerName: "Date",
        sortable: true,
        initialSort: "desc",
        sortingOrder: ["asc", "desc"],
        cellDataType: "date",
        valueGetter: ({ data }) => data && dateFromGoogleDate(data.Date),
      },
      ...goalsInfo.map<ColDef<DailyGoals>>((goal) => ({
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
    [goalsInfo]
  );

  return (
    <Grid<DailyGoals>
      columnDefs={columnDefs}
      getRowId={({ data }) => data.Date}
      rowData={dailyGoals}
    />
  );
}
