'use client';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react';

import { DailyGoalsRow } from '@/types';

export type GridProps = {
  goals: Array<string>;
  rows: Array<DailyGoalsRow>;
};

export const Grid: React.FC<GridProps> = ({ goals, rows }) => {
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
      ...goals.map<ColDef<DailyGoalsRow>>((goal) => ({
        field: goal,
      })),
    ],
    [goals]
  );

  return (
    <div className='ag-theme-quartz grid'>
      <AgGridReact<DailyGoalsRow>
        rowData={rows}
        columnDefs={columnDefs}
        getRowId={({ data }) => data.Date}
      />
    </div>
  );
};
