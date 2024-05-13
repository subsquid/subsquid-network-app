import React from 'react';

import { Button, styled, SxProps } from '@mui/material';
import capitalize from 'lodash-es/capitalize';
import { useSwitchNetwork } from 'wagmi';

import { SwitchArrowsIcon } from '@icons/SwitchArrowsIcon';
import { getChainId, NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork.ts';

const inverseNetworkName = (name: string) =>
  name === NetworkName.Mainnet ? NetworkName.Testnet : NetworkName.Mainnet;

const SwitchButton = styled(Button)<{ fill?: string }>(({ theme, fill }) => ({
  width: 'fit-content',
  fontSize: '0.875rem',
  color: fill || theme.palette?.primary?.contrastText,
  gap: theme.spacing(1),
  margin: theme.spacing(0, 1),
}));

export function NetworkSwitcher({
  sx,
  color,
  hideText = false,
}: {
  sx?: SxProps;
  color?: string;
  hideText?: boolean;
}) {
  const { network, switchAndReset: changeAndReset } = useSubsquidNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const handleAppSwitchAsync = async (network: NetworkName) => {
    try {
      await switchNetworkAsync?.(getChainId(network));
    } catch (e: any) {
      if (e.message?.toLowerCase().includes('user rejected the request')) {
        return;
      }

      throw e;
    }

    changeAndReset(network);
  };

  return (
    <>
      <SwitchButton
        fill={color}
        onClick={async () => handleAppSwitchAsync(inverseNetworkName(network))}
        sx={sx}
      >
        <SwitchArrowsIcon fill={color} />
        {hideText ? null : `Switch to ${capitalize(inverseNetworkName(network))}`}
      </SwitchButton>
    </>
  );
}
