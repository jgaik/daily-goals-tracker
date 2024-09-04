import { CustomHeaderProps } from 'ag-grid-react';
import { useLayoutEffect } from 'react';

import { useDialogContext } from '@/contexts';
import { GoalInfo } from '@/types';

import { GoalInfoPreview } from './goal-info-preview';

export const GoalHeaderComponent: React.FC<
  CustomHeaderProps & { goal: GoalInfo }
> = ({ displayName, eGridHeader, goal }) => {
  const { showDialog } = useDialogContext();

  useLayoutEffect(() => {
    const handleClick = () => {
      showDialog({ children: <GoalInfoPreview {...goal} /> });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (['Enter', ' '].includes(event.key)) {
        handleClick();
      }
    };

    eGridHeader.addEventListener('click', handleClick);
    eGridHeader.addEventListener('keydown', handleKeyDown);

    return () => {
      eGridHeader.removeEventListener('click', handleClick);
      eGridHeader.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayName, eGridHeader, goal, showDialog]);

  return [
    displayName,
    <span key='info' role='presentation'>
      (?)
    </span>,
  ];
};
