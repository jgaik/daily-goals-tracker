'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ColDef } from 'ag-grid-community';
import { AgGridReact, CustomHeaderProps } from 'ag-grid-react';
import { useMemo } from 'react';

import { typedFetch } from '@/apis';
import { useDarkMode } from '@/hooks';
import { DailyGoalsRow, ViewProps } from '@/types';
import { dateFromGoogleDate } from '@/utils';

import { GoalCellRenderer } from './goal-cell-renderer';
import { GoalHeaderComponent } from './goal-header-component';

export const GridView: React.FC<ViewProps> = ({ goals }) => {
  const isDarkMode = useDarkMode();

  const columnDefs = useMemo<ColDef<DailyGoalsRow>[]>(
    () => [
      {
        headerName: 'Date',
        sortable: true,
        initialSort: 'desc',
        sortingOrder: ['asc', 'desc'],
        cellDataType: 'date',
        valueGetter: ({ data }) => data && dateFromGoogleDate(data.Date),
      },
      ...goals.map<ColDef<DailyGoalsRow>>((goal) => ({
        headerName: goal.Goal,
        headerComponent: GoalHeaderComponent,
        headerComponentParams: { goal },
        valueGetter: ({ data }) =>
          data &&
          dateFromGoogleDate(goal['Starting date']) <=
            dateFromGoogleDate(data.Date)
            ? data[goal.Goal]
            : null,
        cellRenderer: GoalCellRenderer,
        sortable: false,
      })),
    ],
    [goals]
  );

  const gridThemeClassName = isDarkMode
    ? 'ag-theme-quartz-dark'
    : 'ag-theme-quartz';

  return (
    <div className={gridThemeClassName}>
      <AgGridReact<DailyGoalsRow>
        columnDefs={columnDefs}
        getRowId={({ data }) => data.Date}
        onGridReady={({ api }) => {
          typedFetch('get', 'dailyGoals').then((rows) => {
            api.applyTransaction({ add: rows });
          });
        }}
      />
    </div>
  );
};
