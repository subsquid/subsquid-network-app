import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import { logger } from '@logger';
import { useQueryClient } from '@tanstack/react-query';
import { max, partition } from 'lodash-es';
// import { useSnackbar,  } from 'notistack';
import { toast } from 'react-hot-toast';
import { useBlockNumber } from 'wagmi';

import { useSquid, useSquidNetworkHeightQuery } from '@api/subsquid-network-squid';
import { localStorageStringSerializer, useLocalStorageState } from '@hooks/useLocalStorageState';

type HeightHook = { height: number; invalidateQueries: unknown[] };

const SquidHeightContext = createContext<{
  currentHeight: number;
  waitHeight: number;
  heightHooks: HeightHook[];
  isLoading: boolean;
  setWaitHeight: (height: bigint | string, invalidateQueries?: unknown[]) => void;
}>({
  currentHeight: 0,
  waitHeight: 0,
  isLoading: false,
  heightHooks: [],
  setWaitHeight: () => {},
});

export function useSquidHeight() {
  const { isLoading, currentHeight, waitHeight, setWaitHeight } = useContext(SquidHeightContext);

  return {
    isLoading,
    isWaiting: currentHeight < waitHeight,
    currentHeight,
    waitHeight,
    setWaitHeight,
  };
}

export function SquidHeightProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const dataSource = useSquid();
  const [heightHooksRaw, setHeightHooksRaw] = useLocalStorageState<string>('sqd_height_hooks', {
    defaultValue: '[]',
    serializer: localStorageStringSerializer,
    storageSync: false,
  });
  const { data, isLoading } = useSquidNetworkHeightQuery(
    dataSource,
    {},
    {
      refetchInterval: 2000,
    },
  );
  // const { enqueueSnackbar } = useSnackbar();

  const currentHeight = data?.squidStatus?.height || 0;

  const heightHooks: HeightHook[] = useMemo(() => {
    try {
      return JSON.parse(heightHooksRaw);
    } catch (e: unknown) {
      logger.error(
        `Cant parse json form squid_height_hooks: ${e instanceof Error ? e.message : e}`,
      );
      return [];
    }
  }, [heightHooksRaw]);

  useEffect(() => {
    const [notReady, ready] = partition(heightHooks, hook => hook.height > currentHeight);
    if (!ready.length) return;

    const topInvalidate = ready.map(hook => hook.invalidateQueries);
    logger.debug(`Executing hooks for ${ready.map(h => h.height).join(`, `)} heights`);
    setHeightHooksRaw(JSON.stringify(notReady));

    Promise.all(
      topInvalidate.map(invalidate => {
        return queryClient.invalidateQueries({ queryKey: invalidate });
      }),
    ).catch(e => {
      logger.error(e);
    });
  }, [currentHeight, heightHooks, queryClient, setHeightHooksRaw]);

  const maxWaitHeight = useMemo(() => {
    return max(heightHooks.map(h => h.height)) || 0;
  }, [heightHooks]);

  useEffect(() => {
    if (maxWaitHeight > 0) {
      toast.loading(`Syncing ${currentHeight} block of ${maxWaitHeight}`, {
        id: 'squid-sync',
        duration: Infinity,
      });
    } else {
      toast.remove('squid-sync');
    }
  }, [maxWaitHeight, currentHeight]);

  const setWaitHeight = useCallback(
    (height: bigint | string, invalidateQueries: unknown[] = []) => {
      heightHooks.push({
        height: Number(height),
        invalidateQueries: invalidateQueries,
      });
      heightHooks.splice(0, heightHooks.length - 10);

      setHeightHooksRaw(JSON.stringify(heightHooks));
    },
    [heightHooks, setHeightHooksRaw],
  );

  const { data: chainHeight } = useBlockNumber();
  useEffect(() => {
    if (isLoading) return;

    if (chainHeight && BigInt(currentHeight) < chainHeight - 5n && maxWaitHeight < chainHeight) {
      setWaitHeight(chainHeight);
    }
  }, [chainHeight, currentHeight, heightHooks, isLoading, maxWaitHeight, setWaitHeight]);

  return (
    <SquidHeightContext.Provider
      value={{
        isLoading,
        heightHooks,
        currentHeight,
        waitHeight: maxWaitHeight,
        setWaitHeight,
      }}
    >
      {children}
    </SquidHeightContext.Provider>
  );
}
