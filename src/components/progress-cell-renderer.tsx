import { assertNonNullable, isNil } from "@yamori-shared/react-utilities";
import { ICellRendererParams } from "ag-grid-community";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

export const ProgressCellRenderer: React.FC<
  ICellRendererParams<any, number>
> = ({ value }) => {
  assertNonNullable(value, "value in progress cell renderer");

  const [currentValue, setCurrentValue] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useLayoutEffect(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCurrentValue((prev) => prev + 1);
    }, 25);
  }, []);

  useEffect(() => {
    if (currentValue < value) return;
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, [currentValue, value]);

  return (
    <progress title={`${value}%`} max={100} value={currentValue}>
      {currentValue}%
    </progress>
  );
};
