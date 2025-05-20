

import { Outlet } from 'react-router-dom';

import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';

import { MyAssets } from './Assets';
import { MyVestings } from './Vestings';

export function AssetsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyAssets />
        <MyVestings />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
