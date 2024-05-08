import React, { ReactElement } from 'react';

import { Box, Button, styled } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { Card } from '@components/Card';
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
      <Card>
        <Box
          sx={{
            minHeight: 100,
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
      </Card>
    );
  }

  return children;
}
