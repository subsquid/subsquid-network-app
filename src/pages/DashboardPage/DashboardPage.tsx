import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';

import { NetworkSummary } from './Summary';
import { Workers } from './Workers';

export function DashboardPage() {
  return (
    <CenteredPageWrapper className="wide">
      <NetworkSummary />
      <Workers />
      <Outlet />
    </CenteredPageWrapper>
  );
}
