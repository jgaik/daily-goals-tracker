'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

import { typedFetch } from '@/apis';
import { useDarkMode } from '@/hooks';
import { DailyGoalsRow, ViewProps } from '@/types';
import { dateFromGoogleDate, isNil } from '@/utils';

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
      ...goals.map<ColDef<DailyGoalsRow>>(
        ({ Goal: goal, 'Starting date': startingDate }) => ({
          field: goal,
          valueGetter: ({ data }) =>
            data &&
            dateFromGoogleDate(startingDate) <= dateFromGoogleDate(data.Date)
              ? data[goal]
              : null,
          cellRenderer: ({
            value,
          }: ICellRendererParams<DailyGoalsRow, boolean>) =>
            isNil(value) ? null : (
              <input type='checkbox' checked={value} readOnly />
            ),
        })
      ),
    ],
    [goals]
  );

  const gridThemeClassName = isDarkMode ? 'ag-theme-quartz-dark' : 'ag-theme-quartz';

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
