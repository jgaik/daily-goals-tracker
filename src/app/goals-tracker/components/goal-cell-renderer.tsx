import { ICellRendererParams } from 'ag-grid-community';

import { DailyGoalsRow } from '@/types';
import { isNil } from '@/utils';

export const GoalCellRenderer: React.FC<
  ICellRendererParams<DailyGoalsRow, boolean>
> = ({ value }) =>
  isNil(value) ? null : <input type='checkbox' checked={value} readOnly />;
