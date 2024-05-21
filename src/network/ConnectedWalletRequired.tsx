import React from 'react';

import { Box, Button, styled } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { WalletIcon } from '@icons/WalletIcon';

export const ConnectButton = styled(Button, {
  name: 'ConnectButton',
})(({ theme }) => ({
  color: theme.palette.info.contrastText,
}));

export function ConnectedWalletRequired({ children }: { children: React.ReactNode[] }) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 300px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>Connect your wallet to proceed</Box>
          <Button variant="contained" startIcon={<WalletIcon />} onClick={openConnectModal}>
            Connect wallet
          </Button>
        </Box>
      </Box>
    );
  }

  return children;
}
