"use client";

import { PropsWithChildren, use } from "react";
import { getDailyGoals, getGoalsInfo } from "./apis";
import { createSimpleContext } from "@yamori-shared/react-utilities";

const { DailyGaolsPromiseProvider, useDailyGaolsPromise } = createSimpleContext(
  "DailyGaolsPromise",
  getDailyGoals()
);

const { GoalsInfoPromiseProvider, useGoalsInfoPromise } = createSimpleContext(
  "GoalsInfoPromise",
  getGoalsInfo()
);

export const ApiDataProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <GoalsInfoPromiseProvider>
    <DailyGaolsPromiseProvider>{children}</DailyGaolsPromiseProvider>
  </GoalsInfoPromiseProvider>
);

export function useDailyGaols() {
  const dailyGaolsPromise = useDailyGaolsPromise();
  return use(dailyGaolsPromise);
}

export function useGoalsInfo() {
  const goalsInfoPromise = useGoalsInfoPromise();
  return use(goalsInfoPromise);
}

export function useApiData() {
  const dailyGoals = useDailyGaols();
  const goalsInfo = useGoalsInfo();

  return { dailyGoals, goalsInfo };
}
