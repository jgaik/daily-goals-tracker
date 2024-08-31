'use client';

import './controls-provider.scss';

import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { View } from '@/constants';
import { ControlsContextProvider } from '@/contexts';
import { Control, ControlContextValue, Controls } from '@/types';

import { ViewControl } from './view-control';

export const ControlsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [controls, setControls] = useState<Controls>({ view: View.Native });
  const [visibleControls, setVisibleControls] = useState<
    Record<Control, boolean>
  >({ view: false });

  const showControl = useCallback(
    (control: Control) =>
      setVisibleControls((prev) => ({ ...prev, [control]: true })),
    []
  );

  const hideControl = useCallback(
    (control: Control) =>
      setVisibleControls((prev) => ({ ...prev, [control]: false })),
    []
  );

  const contextValue = useMemo<ControlContextValue>(
    () => ({
      controls,
      showControl,
      hideControl,
    }),
    [controls, hideControl, showControl]
  );

  return (
    <div className='controls-provider'>
      <div className='controls-provider__controls'>
        {visibleControls['view'] && (
          <ViewControl
            value={controls['view']}
            onChange={(newValue) =>
              setControls((prev) => ({ ...prev, view: newValue }))
            }
          />
        )}
        Control Bar
      </div>
      <ControlsContextProvider value={contextValue}>
        {children}
      </ControlsContextProvider>
    </div>
  );
};
