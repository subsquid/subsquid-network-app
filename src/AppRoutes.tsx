import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { demoFeaturesEnabled } from '@hooks/demoFeaturesEnabled.ts';
import { NetworkLayout } from '@layouts/NetworkLayout';
import { NetworkName, useSubsquidNetwork } from '@network/useSubsquidNetwork.ts';
import { AssetsPage } from '@pages/AssetsPage/AssetsPage.tsx';
import { Vesting } from '@pages/AssetsPage/Vesting.tsx';
import { DashboardPage } from '@pages/DashboardPage/DashboardPage.tsx';
import { DelegationsPage } from '@pages/DelegationsPage/DelegationsPage.tsx';
import { AddNewGateway } from '@pages/GatewaysPage/AddNewGateway.tsx';
import { Gateway } from '@pages/GatewaysPage/Gateway.tsx';
import { GatewaysPage } from '@pages/GatewaysPage/GatewaysPage.tsx';
import { AddNewWorker } from '@pages/WorkersPage/AddNewWorker.tsx';
import { Worker } from '@pages/WorkersPage/Worker.tsx';
import { WorkerEdit } from '@pages/WorkersPage/WorkerEdit.tsx';
import { WorkersPage } from '@pages/WorkersPage/WorkersPage.tsx';

import { hideLoader } from './index.tsx';

export const AppRoutes = () => {
  hideLoader(0);

  const { network } = useSubsquidNetwork();

  return (
    <Routes>
      <Route element={<NetworkLayout />} path="/">
        <Route element={<Navigate to="/assets" replace={true} />} index />
        {demoFeaturesEnabled() || network === NetworkName.Testnet ? (
          <Route path="/dashboard">
            <Route element={<DashboardPage />} index />
            <Route element={<Worker backPath="/dashboard" />} path="workers/:peerId" />
          </Route>
        ) : null}

        <Route path="/assets">
          <Route element={<AssetsPage />} index />
          <Route element={<Vesting backPath="/assets" />} path="vestings/:address" />
        </Route>

        <Route path="/workers">
          <Route element={<WorkersPage />} index />
          <Route element={<AddNewWorker />} path="add" />
          <Route element={<Worker backPath="/workers" />} path=":peerId" />
          <Route element={<WorkerEdit />} path=":peerId/edit" />
        </Route>
        <Route path="/delegations">
          <Route element={<DelegationsPage />} index />
          <Route element={<Worker backPath="/delegations" />} path="workers/:peerId" />
        </Route>
        <Route path="/gateways">
          <Route element={<GatewaysPage />} index />
          <Route element={<AddNewGateway />} path="add" />
          <Route element={<Gateway backPath="/gateways" />} path=":peerId" />
        </Route>
        <Route element={<Navigate to="/assets" replace={true} />} path="*" />
      </Route>
    </Routes>
  );
};
