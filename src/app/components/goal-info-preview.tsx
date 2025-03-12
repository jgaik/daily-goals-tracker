import { GoalInfo } from '@/types';
import { dateFromGoogleDate, getTypedObjectKeys } from '@/utils';

const FORMATTERS: Partial<Record<keyof GoalInfo, (value: any) => string>> = {
  Completion: (value: number) => `${Math.round(100 * value)}%`,
  'Starting date': (value: string) =>
    dateFromGoogleDate(value).toLocaleDateString(),
  'Completed today': (value: boolean) => (value ? 'Yes' : 'No'),
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
