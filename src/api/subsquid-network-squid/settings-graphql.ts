import { fromSqd, toSqd } from '@lib/network';

import { useSquidDataSource } from './datasource';
import { useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const dataSource = useSquidDataSource();
  const { data, isPending } = useSettingsQuery(dataSource);

  const settings = data?.settingsConnection.edges?.[0]?.node;
  const bondAmount = settings?.bondAmount ? settings?.bondAmount : toSqd(100_000);
  const delegationLimitInBp = settings?.delegationLimitCoefficient || 0.2;
  const minimalWorkerVersion = settings?.minimalWorkerVersion || '>=0.0.0';
  const recommendedWorkerVersion = settings?.recommendedWorkerVersion || '>=0.0.0';

  return {
    bondAmount,
    delegationLimit: toSqd(fromSqd(bondAmount).times(delegationLimitInBp)),
    minimalWorkerVersion,
    recommendedWorkerVersion,
    isPending,
  };
}
