import { useEffect, useMemo } from 'react';

import { logger } from '@logger';
import { useQueryClient } from '@tanstack/react-query';
import { max, partition } from 'lodash-es';

import { useSquidDataSource, useSquidNetworkHeightQuery } from '@api/subsquid-network-squid';
import { localStorageStringSerializer, useLocalStorageState } from '@hooks/useLocalStorageState';

type HeightHook = { height: number; invalidateQueries: unknown[] };

export function useSquidNetworkHeightHooks() {
  const queryClient = useQueryClient();
  const dataSource = useSquidDataSource();
  const [heightHooksRaw, setHeightHooksRaw] = useLocalStorageState<string>('squid_height_hooks', {
    defaultValue: '[]',
    serializer: localStorageStringSerializer,
  });
  const { data, isLoading } = useSquidNetworkHeightQuery(
    dataSource,
    {},
    {
      refetchInterval: 2000,
    },
  );

  const currentHeight = data?.squidStatus?.height || 0;

  const heightHooks: HeightHook[] = useMemo(() => {
    try {
      return JSON.parse(heightHooksRaw);
    } catch (e: any) {
      logger.error(`Cant parse json form squid_height_hooks: ${e.message}`);
      return [];
    }
  }, [heightHooksRaw]);

  const maxWaitedHook = useMemo(() => {
    return max(heightHooks.map(h => h.height)) || 0;
  }, [heightHooks]);

  const setWaitHeight = useMemo(() => {
    return (height: bigint | string, invalidateQueries: unknown[] = []) => {
      heightHooks.push({
        height: Number(height),
        invalidateQueries: invalidateQueries,
      });

      setHeightHooksRaw(JSON.stringify(heightHooks));
    };
  }, [heightHooks, setHeightHooksRaw]);

  useEffect(() => {
    const [notReady, ready] = partition(heightHooks, hook => hook.height > currentHeight);
    if (!ready.length) return;

    const topInvalidate = ready.map(hook => hook.invalidateQueries);
    logger.debug(`Executing hooks for ${ready.map(h => h.height).join(`, `)} heights`);
    Promise.all(
      topInvalidate.map(invalidate => {
        return queryClient.invalidateQueries({ queryKey: invalidate });
      }),
    )
      .catch(e => {
        logger.error(e);
      })
      .finally(() => {
        setHeightHooksRaw(JSON.stringify(notReady));
      });
  }, [currentHeight, heightHooks, queryClient, setHeightHooksRaw]);

  return {
    isLoading,
    isWaiting: heightHooks.length > 0,
    waitHeight: maxWaitedHook,
    currentHeight: currentHeight ? String(currentHeight) : '0',
    setWaitHeight,
  };
}
