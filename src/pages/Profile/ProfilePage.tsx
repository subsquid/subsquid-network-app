import React from 'react';

import { Box, Button, Stack, styled, Tab } from '@mui/material';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Outlet } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { PageTabs } from '@components/PageTabs';
import { WalletIcon } from '@icons/WalletIcon';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';

export const DelegationTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  background: 'transparent',

  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.selected': {
    color: theme.palette.text.primary,
    background: 'transparent',
    fontWeight: 500,
  },
  '&.Mui-disabled': {
    opacity: 0.3,
  },
}));

export function ProfilePage() {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <CenteredPageWrapper className="wide">
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
      </CenteredPageWrapper>
    );
  }

  return (
    <CenteredPageWrapper className="wide">
      <Stack sx={{ mb: 3 }} direction="row" alignItems="flex-start" justifyContent="space-between">
        <Box>
          <PageTabs
            TabComponent={DelegationTab}
            tabs={[
              {
                title: 'Assets',
                path: '/profile/assets',
              },
              {
                title: 'My delegations',
                path: '/profile/delegations',
              },
              {
                title: 'My workers',
                path: '/profile/workers',
              },
              {
                title: 'My gateways',
                path: '/profile/gateways',
                // disabled: !demoFeaturesEnabled(),
              },
            ]}
          />
        </Box>
      </Stack>
      <Outlet />
    </CenteredPageWrapper>
  );
}
