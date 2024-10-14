import { toSqd } from '@lib/network';

import { useSquid } from './datasource';
import { useCurrentEpochQuery, useNetworkSummaryQuery, useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const dataSource = useSquid();
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

export function useNetworkSummary() {
  const dataSource = useSquid();
  const { data: networkStats, isLoading: isNetworkStatsLoading } = useNetworkSummaryQuery(
    dataSource,
    {},
    {
      select: res => {
        return {
          ...res.networkStats,
        };
      },
    },
  );

  const { data: currentEpoch, isLoading: isCurrentEpochLoading } = useCurrentEpochQuery(
    dataSource,
    {},
    {
      select: res => {
        return {
          ...res.networkStats,
          epoch: res.epoches.length ? res.epoches[0] : undefined,
        };
      },
      refetchInterval: 6000, // a half of block time in l1
    },
  );

  return {
    data:
      networkStats && currentEpoch
        ? {
            ...networkStats,
            ...currentEpoch,
          }
        : undefined,
    isLoading: isNetworkStatsLoading || isCurrentEpochLoading,
  };
}
