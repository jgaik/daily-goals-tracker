export type DailyGoalsRow = {
  Date: string;
} & Record<string, string>;

export type GoalInfo = {
  Goal: string;
  "Starting date": string;
};
