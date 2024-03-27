import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { NetworkLayout } from '@layouts/NetworkLayout';
import { AddNewGateway } from '@pages/GatewayPage/AddNewGateway.tsx';
import { Gateway } from '@pages/GatewayPage/Gateway.tsx';
// import NetworkDashboardPage from '@pages/NetworkDashboard/NetworkDashboardPage.tsx';
import { MyAssets } from '@pages/Profile/MyAssets.tsx';
import { MyDelegations } from '@pages/Profile/MyDelegations.tsx';
import { MyGateways } from '@pages/Profile/MyGateways.tsx';
import { MyWorkers } from '@pages/Profile/MyWorkers.tsx';
import { ProfilePage } from '@pages/Profile/ProfilePage.tsx';
import { AddNewWorker } from '@pages/WorkersPage/AddNewWorker.tsx';
import Worker from '@pages/WorkersPage/Worker.tsx';
import { WorkerEdit } from '@pages/WorkersPage/WorkerEdit.tsx';
import { WorkersPage } from '@pages/WorkersPage/WorkersPage.tsx';

import { hideLoader } from './index.tsx';

export const AppRoutes = () => {
  hideLoader(0);

  return (
    <Routes>
      <Route element={<NetworkLayout />} path="/workers">
        <Route element={<WorkersPage />} index />
        <Route element={<Worker backPath="/workers" />} path=":peerId" />
      </Route>
      {/*<Route element={<NetworkLayout />} path="/network-dashboard">*/}
      {/*  <Route index element={<NetworkDashboardPage />} />*/}
      {/*</Route>*/}
      <Route element={<NetworkLayout />} path="/profile">
        <Route path="" element={<ProfilePage />}>
          <Route element={<MyAssets />} path="assets" />
          <Route element={<MyDelegations />} path="delegations" />

          <Route element={<AddNewWorker />} path="workers/add" />
          <Route element={<MyWorkers />} path="workers" />
          <Route element={<WorkerEdit />} path="workers/:peerId/edit" />
          <Route element={<Worker backPath="/profile/workers" />} path="workers/:peerId" />

          <Route element={<AddNewGateway />} path="gateways/add" />
          <Route element={<MyGateways />} path="gateways" />
          <Route element={<Gateway backPath="/profile/gateways" />} path="gateways/:peerId" />

          <Route element={<Navigate to="assets" replace={true} />} index />
        </Route>
      </Route>
      <Route element={<Navigate to="/workers" replace={true} />} path="*" />
    </Routes>
  );
};
