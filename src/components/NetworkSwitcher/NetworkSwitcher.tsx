import React from 'react';

import { Button, styled, SxProps } from '@mui/material';
import capitalize from 'lodash-es/capitalize';

import { SwitchArrowsIcon } from '@icons/SwitchArrowsIcon';
import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork.ts';

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
  const [network, changNetwork] = useSubsquidNetwork();

  const inverseNetworkName = (name: string) =>
    name === NetworkName.Mainnet ? NetworkName.Testnet : NetworkName.Mainnet;

  const handleAppSwitch = () => {
    changNetwork(inverseNetworkName(network));
  };

  return (
    <>
      <SwitchButton fill={color} onClick={handleAppSwitch} sx={sx}>
        <SwitchArrowsIcon fill={color} />
        {hideText ? null : `Switch to ${capitalize(inverseNetworkName(network))}`}
      </SwitchButton>
    </>
  );
}
