import { createContext, useMemo } from 'react';
import { useContext } from 'react';

import { Control, ControlContextValue } from './types';
import { Controls } from './types';

const ControlsContext = createContext<ControlContextValue | null>(null);

ControlsContext.displayName = 'ControlContext';

export function useControlsContext<C extends Control>(
  control: C
): [control: Controls[C], showControl: () => void, hideControl: () => void] {
  const controlsContext = useContext(ControlsContext);

  if (!controlsContext) {
    throw new Error(
      'Component using useControlContext hook must be a children of the ControlContextProvider'
    );
  }

  const { controls, showControl, hideControl } = controlsContext;

  const controlValue = useMemo(() => controls[control], [control, controls]);

  return useMemo(
    () => [
      controlValue,
      () => showControl(control),
      () => hideControl(control),
    ],
    [controlValue, showControl, control, hideControl]
  );
}

export const ControlsContextProvider = ControlsContext.Provider;
