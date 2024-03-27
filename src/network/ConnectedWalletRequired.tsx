import React, { ReactElement } from 'react';

import { Box, Button, styled } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { WalletIcon } from '@icons/WalletIcon';

export const ConnectButton = styled(Button, {
  name: 'ConnectButton',
})(({ theme }) => ({
  color: theme.palette.info.contrastText,
}));

export function ConnectedWalletRequired({ children }: { children: ReactElement }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <Box>
        <Box>Connect your wallet to proceed</Box>
        <ConnectButton startIcon={<WalletIcon />} onClick={openConnectModal}>
          Connect wallet
        </ConnectButton>
      </Box>
    );
  }

  return children;
}
