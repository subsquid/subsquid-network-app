import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';

import { NetworkSummary } from './Summary';
import { Workers } from './Workers';

export function DashboardPage() {
  return (
    <CenteredPageWrapper className="wide">
      {/* <NetworkPageTitle title="Dashboard" /> */}
      <NetworkSummary />
      <Workers />
      <Outlet />
    </CenteredPageWrapper>
  );
}
