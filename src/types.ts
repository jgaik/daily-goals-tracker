export type DailyGoals = {
  Date: string;
} & Record<string, string>;

export type GoalInfo = {
  Goal: string;
  "Starting date": string;
};
