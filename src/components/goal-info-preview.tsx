"use client";
import { GoalInfo } from "@/types";
import { dateFromGoogleDate } from "@/utils";
import { getTypedObjectKeys } from "@yamori-shared/react-utilities";

const FORMATTERS: Partial<Record<keyof GoalInfo, (value: any) => string>> = {
  "Starting date": (value: string) =>
    dateFromGoogleDate(value).toLocaleDateString(),
};

export const GoalInfoPreview: React.FC<GoalInfo> = (goal) => {
  return (
    <ul>
      {getTypedObjectKeys(goal).map((key) => {
        const formatter =
          FORMATTERS[key] ?? ((value: string | number | boolean) => value);

        return (
          <li key={key}>
            <strong>{key}</strong>: {formatter(goal[key])}
          </li>
        );
      })}
    </ul>
  );
};
