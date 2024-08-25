'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

import { typedFetch } from '@/apis';
import { DailyGoalsRow, GoalInfo } from '@/types';

export type GridProps = {
  goals: Array<GoalInfo>;
};

export const Grid: React.FC<GridProps> = ({ goals }) => {
  const columnDefs = useMemo<ColDef<DailyGoalsRow>[]>(
    () => [
      {
        headerName: 'Date',
        sortable: true,
        initialSort: 'desc',
        sortingOrder: ['asc', 'desc'],
        cellDataType: 'date',
        valueGetter: ({ data }) => {
          if (!data) return;
          const [day, month, year] = data.Date.split('/');
          return new Date(`${year}-${month}-${day}`);
        },
      },
      ...goals.map<ColDef<DailyGoalsRow>>(({ Goal }) => ({
        field: Goal,
        valueGetter: ({ data }) => data![Goal] === 'TRUE',
        cellDataType: 'boolean',
      })),
    ],
    [goals]
  );

  return (
    <div className='ag-theme-quartz'>
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
