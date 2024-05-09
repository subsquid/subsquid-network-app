import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { useAccount } from '@network/useAccount';

import { MyAssets } from './Assets';
import { Workers } from './Workers';

export function DashboardPage() {
  const { isConnected } = useAccount();
  return (
    <CenteredPageWrapper className="wide">
      {isConnected ? (
        <>
          <MyAssets />
          <Box sx={{ height: 64 }} />
        </>
      ) : null}

      <Workers />
      <Outlet />
    </CenteredPageWrapper>
  );
}
