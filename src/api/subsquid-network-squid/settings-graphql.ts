import Decimal from 'decimal.js';

import { fromSqd } from '@api/contracts/utils';

import { SQUID_DATASOURCE } from './datasource';
import { useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const { data, isPending } = useSettingsQuery(SQUID_DATASOURCE);

  const settings = data?.settingsConnection.edges?.[0]?.node;
  const bondAmount = settings?.bondAmount ? fromSqd(settings?.bondAmount) : new Decimal(100_000);
  const delegationLimitInBp = settings?.delegationLimitCoefficient || 0.2;

  return {
    bondAmount,
    delegationLimit: bondAmount.mul(delegationLimitInBp),
    isPending,
  };
}
