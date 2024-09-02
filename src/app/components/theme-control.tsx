import React from 'react';

import { LocalStorageKey } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { isNil } from '@/utils';

export const ThemeControl: React.FC = () => {
  const [useDarkMode, setUseDarkMode, removeUseDarkModeKey] =
    useLocalStorage<boolean>(LocalStorageKey.UseDarkMode);

  const themeValue = isNil(useDarkMode)
    ? 'browser'
    : useDarkMode
    ? 'dark'
    : 'light';

  return (
    <label>
      Theme:
      <select
        value={themeValue}
        onChange={(event) => {
          const value = event.target.value;

          if (value === 'browser') {
            removeUseDarkModeKey();
          } else {
            setUseDarkMode(value === 'dark');
          }
        }}
      >
        <option value='browser'>Browser</option>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>
    </label>
  );
};
