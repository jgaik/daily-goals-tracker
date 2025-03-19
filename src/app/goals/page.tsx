"use client";

import { Grid } from "@/components";
import { useApiData } from "@/contexts";
import { dateFromGoogleDate } from "@/utils";
import { ColDef } from "ag-grid-community";
import { useMemo } from "react";

type GoalsRow = {
  name: string;
  startingDate: Date;
  activeDays: number;
  completedDays: number;
};

export default function Goals() {
  const { dailyGoals, goalsInfo } = useApiData();

  const columnDefs = useMemo<ColDef<GoalsRow>[]>(
    () => [
      {
        headerName: "Goal",
        field: "name",
        sortable: true,
      },
      {
        headerName: "Starting date",
        cellDataType: "date",
        field: "startingDate",
        sortable: true,
      },
      {
        headerName: "Completion",
        valueGetter: ({ data }) =>
          data &&
          `${Math.floor((100 * data.completedDays) / data.activeDays)}%`,
      },
    ],
    []
  );

  const goalsRows = useMemo(
    () =>
      goalsInfo.map<GoalsRow>((goalInfo) => {
        const startingDate = dateFromGoogleDate(goalInfo["Starting date"]);

        return {
          name: goalInfo.Goal,
          startingDate,
          activeDays: Math.floor(
            (Date.now() - startingDate.getTime()) / (1000 * 60 * 60 * 24) || 1
          ),
          completedDays:
            dailyGoals.length -
            dailyGoals.findIndex(
              ({ Date }) => Date === goalInfo["Starting date"]
            ),
        };
      }),
    [dailyGoals, goalsInfo]
  );

  return (
    <Grid<GoalsRow>
      columnDefs={columnDefs}
      getRowId={({ data }) => data.name}
      rowData={goalsRows}
    />
  );
}
