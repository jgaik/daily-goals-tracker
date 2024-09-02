'use client';

import { useCallback, useLayoutEffect, useState } from 'react';

import { LocalStorageKey } from './constants';
import { isNil } from './utils';

const DARK_MODE_MEDIA = window.matchMedia('(prefers-color-scheme: dark)');

export function useLocalStorage<T>(
  key: string
): [value: T | null, setValue: (value: T) => void, removeKey: () => void] {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);

    return !isNil(storedValue) ? JSON.parse(storedValue) : null;
  });

  const setAndStoreValue = useCallback(
    (value: T) => {
      setValue(value);
      localStorage.setItem(key, JSON.stringify(value));

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
    localStorage.removeItem(key);

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
  const [useDarkMode, setUseDarkMode] = useState(() => DARK_MODE_MEDIA.matches);
  const [localDarkMode] = useLocalStorage<boolean>(LocalStorageKey.UseDarkMode);

  useLayoutEffect(() => {
    const readDarkMode = () => {
      setUseDarkMode(DARK_MODE_MEDIA.matches);
    };

    DARK_MODE_MEDIA.addEventListener('change', readDarkMode);

    return () => {
      DARK_MODE_MEDIA.removeEventListener('change', readDarkMode);
    };
  }, []);

  return localDarkMode ?? useDarkMode;
}
