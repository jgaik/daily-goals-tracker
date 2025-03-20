"use client";

import { Grid } from "@/components";
import { useApiData } from "@/contexts";
import { DailyGoals } from "@/types";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";

export default function Home() {
  const { dailyGoals, goalsInfo } = useApiData();

  const columnDefs = useMemo<ColDef<DailyGoals>[]>(
    () => [
      {
        field: "Date",
        sortable: true,
        initialSort: "desc",
        sortingOrder: ["asc", "desc"],
        suppressMovable: true,
        lockPosition: true,
        lockVisible: true,
        pinned: true,
      },
      ...goalsInfo.map<ColDef<DailyGoals>>((goal) => ({
        headerName: goal.Goal,
        headerComponentParams: { goal },
        valueGetter: ({ data }) =>
          data && goal["Starting date"] <= data.Date ? data[goal.Goal] : null,
        sortable: false,
        cellDataType: "boolean",
        wrapHeaderText: true,
        autoHeaderHeight: true,
      })),
    ],
    [goalsInfo]
  );

  return (
    <Grid<DailyGoals>
      autoSizeStrategy={{
        type: "fitCellContents",
        colIds: ["Date"],
      }}
      columnDefs={columnDefs}
      getRowId={({ data }) => data.Date.toString()}
      rowData={dailyGoals}
    />
  );
}
