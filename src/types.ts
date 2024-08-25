export type DailyGoalsRow = {
  Date: string;
} & Record<string, string>;

export type GoalInfo = {
  Goal: string;
  Completion: number;
  Streak: number;
  'Starting date': string;
  'Active days': number;
  'Completed days': number;
  'Completed today': boolean;
};

export type Nullable<T> = T | null | undefined;
