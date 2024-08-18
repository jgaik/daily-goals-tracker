import './page.scss';

import { getDailyGoals } from '@/apis';

import { Grid } from './components';

const GridView: React.FC = async () => {
  const { goals, rows } = await getDailyGoals();

  return <Grid goals={goals} rows={rows} />;
};

export default GridView;
