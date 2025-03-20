export type DailyGoals = {
  Date: Date;
  Comments?: string;
} & Record<string, boolean>;

export type GoalInfo = {
  Goal: string;
  "Starting date": Date;
};
