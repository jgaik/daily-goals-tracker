import { typedFetch } from '@/apis';

import { ViewSwitcher } from './components';

const GoalsTracker: React.FC = async () => {
  const goals = await typedFetch('get', 'goalsInfo', { cache: 'no-cache' });

  return <ViewSwitcher goals={goals} />;
};

export default GoalsTracker;
