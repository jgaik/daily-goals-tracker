"use client";

import { Checkbox } from "@yamori-design/react-components";
import { isNil } from "@yamori-shared/react-utilities";
import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  ICellRendererParams,
  ModuleRegistry,
  PinnedRowModule,
  RowAutoHeightModule,
  themeQuartz,
  ValidationModule,
} from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { ProgressCellRenderer } from "./progress-cell-renderer";
import "./grid.scss";

ModuleRegistry.registerModules([
  ColumnAutoSizeModule,
  ClientSideRowModelModule,
  ClientSideRowModelApiModule,
  PinnedRowModule,
  RowAutoHeightModule,
  ValidationModule,
]);

const COMPONENTS = {
  agCheckboxCellRenderer: ({ value }: ICellRendererParams<any, boolean>) =>
    isNil(value) ? null : <Checkbox checked={value} />,
  progressCellRenderer: ProgressCellRenderer,
};

export const Grid = <T,>({
  className = "",
  ...props
}: Omit<AgGridReactProps<T>, "theme" | "components">) => {
  return (
    <AgGridReact<T>
      className={`grid ${className}`}
      theme={themeQuartz}
      components={COMPONENTS}
      {...props}
    />
  );
};
