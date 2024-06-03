import Decimal from 'decimal.js';

import { fromSqd } from '@api/contracts/utils';

import { useSquidDataSource } from './datasource';
import { useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const dataSource = useSquidDataSource();
  const { data, isPending } = useSettingsQuery(dataSource);

  const settings = data?.settingsConnection.edges?.[0]?.node;
  const bondAmount = settings?.bondAmount ? fromSqd(settings?.bondAmount) : new Decimal(100_000);
  const delegationLimitInBp = settings?.delegationLimitCoefficient || 0.2;
  const minimalWorkerVersion = settings?.minimalWorkerVersion || '>=0.0.0';
  const recommendedWorkerVersion = settings?.recommendedWorkerVersion || '>=0.0.0';

  return {
    bondAmount,
    delegationLimit: bondAmount.mul(delegationLimitInBp),
    minimalWorkerVersion,
    recommendedWorkerVersion,
    isPending,
  };
}
