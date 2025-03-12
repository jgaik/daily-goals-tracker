"use client";

import { useLayoutEffect, useMemo, useState } from "react";

import { LocalStorageKey } from "./constants";
import { useLocalStorage } from "@yamori-shared/react-utilities";

export function useDarkMode() {
  const darkModeMedia = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    []
  );

  const [useDarkMode, setUseDarkMode] = useState(() => darkModeMedia.matches);
  const [localDarkMode] = useLocalStorage<boolean>(LocalStorageKey.UseDarkMode);

  useLayoutEffect(() => {
    const readDarkMode = () => {
      setUseDarkMode(darkModeMedia.matches);
    };

    darkModeMedia.addEventListener("change", readDarkMode);

    return () => {
      darkModeMedia.removeEventListener("change", readDarkMode);
    };
  }, [darkModeMedia]);

  return localDarkMode ?? useDarkMode;
}
