import { typedFetch } from '@/apis';

import { Grid } from './components';

const GridView: React.FC = async () => {
  const goals = await typedFetch('get', 'goalsInfo', { cache: 'no-cache' });

  return <Grid goals={goals} />;
};

export default GridView;
