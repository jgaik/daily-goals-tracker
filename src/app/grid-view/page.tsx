import './page.scss';

import { typedFetch } from '@/apis';

import { Grid } from './components';

export default async function GridView() {
  const rows = await typedFetch('get', 'goalsInfo');

  return <Grid goals={['Date']} rows={rows} />;
}
