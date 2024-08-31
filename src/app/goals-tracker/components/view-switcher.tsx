'use client';

import { useLayoutEffect } from 'react';

import { View } from '@/constants';
import { useControlsContext } from '@/contexts';
import { ViewProps } from '@/types';

import { GridView } from './grid-view';
import { NativeView } from './native-view';

export const ViewSwitcher: React.FC<ViewProps> = (props) => {
  const [vieControl, showViewControl, hideViewControl] =
    useControlsContext('view');

  useLayoutEffect(() => {
    showViewControl();

    return () => {
      hideViewControl();
    };
  }, [hideViewControl, showViewControl]);

  switch (vieControl) {
    case View.Native:
      return <NativeView {...props} />;
    case View.AgGrid:
      return <GridView {...props} />;
    default:
      return null;
  }
};
