import React from 'react';

import { Button, styled, SxProps } from '@mui/material';
import capitalize from 'lodash-es/capitalize';
import { useSwitchNetwork } from 'wagmi';

import { SwitchArrowsIcon } from '@icons/SwitchArrowsIcon';
import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork.ts';
import { getChainId } from '@network/useSwitchNetwork';

const SwitchButton = styled(Button)<{ fill?: string }>(({ theme, fill }) => ({
  width: 'fit-content',
  fontSize: '0.875rem',
  color: fill || theme.palette?.primary?.contrastText,
  gap: '0.625rem',
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
  const { network, changeAndReset } = useSubsquidNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const inverseNetworkName = (name: string) =>
    name === NetworkName.Mainnet ? NetworkName.Testnet : NetworkName.Mainnet;

  const handleAppSwitchAsync = async (network: NetworkName) => {
    await switchNetworkAsync?.(getChainId(network));
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
