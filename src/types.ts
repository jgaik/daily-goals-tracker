import { ComponentPropsWithoutRef } from 'react';

import { View } from './constants';

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

export type ViewProps = {
  goals: Array<GoalInfo>;
};

export type Controls = {
  view: View;
};

export type Control = keyof Controls;

export type ControlContextValue = {
  controls: Controls;
  showControl: (control: Control) => void;
  hideControl: (control: Control) => void;
};

export type DialogContextValue = {
  showDialog: (props: ComponentPropsWithoutRef<'dialog'>) => void;
};
