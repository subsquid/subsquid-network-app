import React from 'react';

import { SourceWalletWithBalance, useMySources } from '@api/subsquid-network-squid';

import { SourceWalletOption } from './SourceWalletOption';

export function useMySourceOptions({
  enabled = true,
  sourceDisabled,
}: { enabled?: boolean; sourceDisabled?: (w: SourceWalletWithBalance) => boolean } = {}) {
  const { sources, isPending } = useMySources({ enabled });

  const options = sources.map(s => {
    return {
      label: <SourceWalletOption source={s} />,
      value: s.id,
      disabled: sourceDisabled?.(s),
    };
  });

  return {
    sources,
    isPending,
    options,
  };
}
