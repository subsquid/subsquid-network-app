import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { NetworkLayout } from '@layouts/NetworkLayout';
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

  return (
    <Routes>
      <Route element={<NetworkLayout />} path="/">
        <Route element={<Navigate to="/assets" replace={true} />} index />
        <Route path="/dashboard">
          <Route element={<DashboardPage />} index />
        </Route>

        <Route path="/assets">
          <Route element={<AssetsPage />} index />
          <Route element={<Vesting backPath="/assets" />} path="vestings/:address" />
        </Route>

        <Route path="/workers">
          <Route element={<WorkersPage />} index />
          <Route element={<AddNewWorker />} path="add" />
          <Route element={<Worker backPath="/dashboard" />} path=":peerId" />
          <Route element={<WorkerEdit />} path=":peerId/edit" />
        </Route>
        <Route path="/delegations">
          <Route element={<DelegationsPage />} index />
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
