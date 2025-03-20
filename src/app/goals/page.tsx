"use client";

import { Grid } from "@/components";
import { useApiData } from "@/contexts";
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
        flex: 1,
        lockPosition: true,
        pinned: true,
        suppressMovable: true,
        lockVisible: true,
        wrapText: true,
        autoHeight: true,
      },
      {
        headerName: "Starting date",
        field: "startingDate",
      },
      {
        headerName: "Completion",
        valueGetter: ({ data }) =>
          data &&
          `${Math.floor((100 * data.completedDays) / data.activeDays)}%`,
      },
      {
        headerName: "Active Days",
        field: "activeDays",
      },
    ],
    []
  );

  const goalsRows = useMemo(
    () =>
      goalsInfo.map<GoalsRow>((goalInfo) => {
        const startingDate = goalInfo["Starting date"];

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

  const pinnedBottomRowData = useMemo<Partial<GoalsRow>[]>(() => {
    let activeGoalsCount = 0;

    return [
      {
        name: "Overall",
        completedDays: dailyGoals.filter(
          ({ Date, Comments: _, ...tracked }) => {
            if (activeGoalsCount < goalsInfo.length) {
              activeGoalsCount = goalsInfo.filter(
                (goalInfo) => goalInfo["Starting date"] <= Date
              ).length;
            }
            return (
              Object.values(tracked).filter(Boolean).length === activeGoalsCount
            );
          }
        ).length,
        activeDays: Math.floor(
          (Date.now() - dailyGoals[0]["Date"].getTime()) /
            (1000 * 60 * 60 * 24) || 1
        ),
      },
    ];
  }, [dailyGoals, goalsInfo]);

  return (
    <Grid<GoalsRow>
      autoSizeStrategy={{
        type: "fitGridWidth",
      }}
      columnDefs={columnDefs}
      getRowId={({ data }) => data.name}
      rowData={goalsRows}
      defaultColDef={{
        sortable: true,
        resizable: true,
      }}
      pinnedBottomRowData={pinnedBottomRowData}
    />
  );
}
