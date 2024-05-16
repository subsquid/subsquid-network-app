import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';

import { MyAssets } from './Assets';
import { MyVestings } from './Vestings';

export function AssetsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <MyAssets />
      <Box sx={{ height: 64 }} />
      <MyVestings />
      <Outlet />
    </CenteredPageWrapper>
  );
}