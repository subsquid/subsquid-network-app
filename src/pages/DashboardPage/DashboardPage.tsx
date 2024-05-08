import React from 'react';

import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';

import { Workers } from './Workers';

export function DashboardPage() {
  return (
    <CenteredPageWrapper className="wide">
      <Workers />
      <Outlet />
    </CenteredPageWrapper>
  );
}
