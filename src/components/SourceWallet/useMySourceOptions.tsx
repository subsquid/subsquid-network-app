import { useMySources } from '@api/subsquid-network-squid';

export function useMySourceOptions({ enabled = true }: { enabled?: boolean }) {
  const { sources, isPending } = useMySources({ enabled });

  return {
    sources,
    isPending,
  };
}
