"use client";

import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColDef,
  ModuleRegistry,
  themeQuartz,
  ValidationModule,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";

import { getDailyGoals } from "@/apis";
import { DailyGoalsRow, GoalInfo } from "@/types";
import { dateFromGoogleDate } from "@/utils";

import { GoalCellRenderer } from "./goal-cell-renderer";
import { GoalHeaderComponent } from "./goal-header-component";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClientSideRowModelApiModule,
  ValidationModule,
]);

export const GridView: React.FC<{ goals: GoalInfo[] }> = ({ goals }) => {
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
        headerComponent: GoalHeaderComponent,
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
    <AgGridReact<DailyGoalsRow>
      theme={themeQuartz}
      columnDefs={columnDefs}
      getRowId={({ data }) => data.Date}
      onGridReady={({ api }) => {
        getDailyGoals().then((rows) => {
          api.applyTransaction({ add: rows });
        });
      }}
      rowModelType="clientSide"
    />
  );
};
