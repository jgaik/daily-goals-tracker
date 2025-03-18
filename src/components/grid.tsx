"use client";

import {
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ModuleRegistry,
  themeQuartz,
  ValidationModule,
} from "ag-grid-community";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClientSideRowModelApiModule,
  ValidationModule,
]);

export const Grid = <T,>(props: Omit<AgGridReactProps<T>, "theme">) => {
  return <AgGridReact<T> theme={themeQuartz} {...props} />;
};
