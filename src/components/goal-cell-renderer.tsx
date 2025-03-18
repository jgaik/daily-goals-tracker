"use client";

import { ICellRendererParams } from "ag-grid-community";
import { DailyGoalsRow } from "@/types";
import { isNil } from "@yamori-shared/react-utilities";
import { Checkbox } from "@yamori-design/react-components";

export const GoalCellRenderer: React.FC<
  ICellRendererParams<DailyGoalsRow, boolean>
> = ({ value }) =>
  isNil(value) ? null : <Checkbox checked={value} readOnly />;
