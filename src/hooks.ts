'use client';

import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { LocalStorageKey } from './constants';
import { isNil } from './utils';

export function useLocalStorage<T>(
  key: string
): [value: T | null, setValue: (value: T) => void, removeKey: () => void] {
  const [value, setValue] = useState<T | null>(() => {
    if (typeof window === 'undefined') return null;

    const storedValue = window.localStorage.getItem(key);

    return !isNil(storedValue) ? JSON.parse(storedValue) : null;
  });

  const setAndStoreValue = useCallback(
    (value: T) => {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));

      window.dispatchEvent(
        new CustomEvent('local-storage', {
          detail: {
            key,
            value: JSON.stringify(value),
          },
        })
      );
    },
    [key]
  );

  useLayoutEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === key) {
        setValue(!isNil(event.newValue) ? JSON.parse(event.newValue) : null);
      }
    };

    const handleLocalStorage = (
      event: CustomEvent<{
        key: string;
        value: string | null;
      }>
    ) => {
      if (event.detail.key === key) {
        setValue(
          !isNil(event.detail.value) ? JSON.parse(event.detail.value) : null
        );
      }
    };

    window.addEventListener('storage', handleStorage);

    window.addEventListener('local-storage', handleLocalStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);

      window.removeEventListener('local-storage', handleLocalStorage);
    };
  }, [key]);

  const removeKey = useCallback(() => {
    window.localStorage.removeItem(key);

    window.dispatchEvent(
      new CustomEvent('local-storage', {
        detail: {
          key,
          value: null,
        },
      })
    );
  }, [key]);

  return [value, setAndStoreValue, removeKey];
}

export function useDarkMode() {
  const darkModeMedia = useMemo(
    () => window.matchMedia('(prefers-color-scheme: dark)'),
    []
  );

  const [useDarkMode, setUseDarkMode] = useState(() => darkModeMedia.matches);
  const [localDarkMode] = useLocalStorage<boolean>(LocalStorageKey.UseDarkMode);

  useLayoutEffect(() => {
    const readDarkMode = () => {
      setUseDarkMode(darkModeMedia.matches);
    };

    darkModeMedia.addEventListener('change', readDarkMode);

    return () => {
      darkModeMedia.removeEventListener('change', readDarkMode);
    };
  }, [darkModeMedia]);

  return localDarkMode ?? useDarkMode;
}
