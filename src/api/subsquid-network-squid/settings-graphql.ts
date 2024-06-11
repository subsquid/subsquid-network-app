import { toSqd } from '@lib/network';

import { useSquidDataSource } from './datasource';
import { useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const dataSource = useSquidDataSource();
  const { data, isPending } = useSettingsQuery(dataSource);

  const settings = data?.settingsConnection.edges?.[0]?.node;
  const bondAmount = settings?.bondAmount ? settings?.bondAmount : toSqd(100_000);
  const minimalWorkerVersion = settings?.minimalWorkerVersion || '>=0.0.0';
  const recommendedWorkerVersion = settings?.recommendedWorkerVersion || '>=0.0.0';

  return {
    bondAmount,
    minimalWorkerVersion,
    recommendedWorkerVersion,
    isPending,
  };
}
