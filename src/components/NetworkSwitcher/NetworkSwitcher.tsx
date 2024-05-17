import React from 'react';

import { Button, styled, SxProps } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { SwitchArrowsIcon } from '@icons/SwitchArrowsIcon';
import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork.ts';

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
  const { network, switchAndReset } = useSubsquidNetwork();

  return (
    <>
      <SwitchButton
        fill={color}
        onClick={async () => switchAndReset(inverseNetworkName(network))}
        sx={sx}
      >
        <SwitchArrowsIcon fill={color} />
        {hideText ? null : `Switch to ${capitalize(inverseNetworkName(network))}`}
      </SwitchButton>
    </>
  );
}
