import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';

import { MyAssets } from './Assets';
import { Workers } from './Workers';

export function DashboardPage() {
  return (
    <CenteredPageWrapper className="wide">
      <MyAssets />
      <Box sx={{ height: 64 }} />
      <Workers />
      <Outlet />
    </CenteredPageWrapper>
  );
}
