import { useMemo } from 'react';

import { toSqd } from '@lib/network';

import { useSquid } from './datasource';
import { useCurrentEpochQuery, useNetworkSummaryQuery, useSettingsQuery } from './graphql';

export function useNetworkSettings() {
  const { data, isPending, isLoading } = useSettingsQuery();

  const settings = data?.settingsConnection.edges?.[0]?.node;
  const bondAmount = settings?.bondAmount ? settings?.bondAmount : toSqd(100_000);
  const minimalWorkerVersion = settings?.minimalWorkerVersion || '>=0.0.0';
  const recommendedWorkerVersion = settings?.recommendedWorkerVersion || '>=0.0.0';

  return {
    bondAmount,
    minimalWorkerVersion,
    recommendedWorkerVersion,
    isPending,
    isLoading,
  };
}

export function useNetworkStats() {
  const dataSource = useSquid();
  const { data, isLoading } = useNetworkSummaryQuery(
    {},
    {
      select: res => res.networkStats,
    },
  );

  return {
    data,
    isLoading,
  };
}

export function useCurrentEpoch() {
  const dataSource = useSquid();
  const { data, isLoading } = useCurrentEpochQuery(
    {},
    {
      select: res => ({
        ...res.networkStats,
        epoch: res.epoches.length ? res.epoches[0] : undefined,
      }),
      refetchInterval: 12_000, // block time in l1
    },
  );

  return {
    data,
    isLoading,
  };
}

// For backward compatibility
export function useNetworkSummary() {
  const { data: networkStats, isLoading: isNetworkStatsLoading } = useNetworkStats();
  const { data: currentEpoch, isLoading: isCurrentEpochLoading } = useCurrentEpoch();

  const data = useMemo(() => {
    return networkStats && currentEpoch
      ? {
          ...networkStats,
          ...currentEpoch,
        }
      : undefined;
  }, [networkStats, currentEpoch]);

  return {
    data,
    isLoading: isNetworkStatsLoading || isCurrentEpochLoading,
  };
}
