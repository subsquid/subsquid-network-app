import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { NetworkLayout } from '@layouts/NetworkLayout';
import { DashboardPage } from '@pages/DashboardPage/DashboardPage.tsx';
import { DelegationsPage, MyDelegations } from '@pages/DelegationsPage/DelegationsPage.tsx';
import { AddNewGateway } from '@pages/GatewaysPage/AddNewGateway.tsx';
import { Gateway } from '@pages/GatewaysPage/Gateway.tsx';
import { GatewaysPage, MyGateways } from '@pages/GatewaysPage/GatewaysPage.tsx';
import { ProfilePage } from '@pages/Profile/ProfilePage.tsx';
import { AddNewWorker } from '@pages/WorkersPage/AddNewWorker.tsx';
import { Worker } from '@pages/WorkersPage/Worker.tsx';
import { WorkerEdit } from '@pages/WorkersPage/WorkerEdit.tsx';
import { MyWorkers, WorkersPage } from '@pages/WorkersPage/WorkersPage.tsx';

import { hideLoader } from './index.tsx';

export const AppRoutes = () => {
  hideLoader(0);

  return (
    <Routes>
      <Route element={<NetworkLayout />} path="/dashboard">
        <Route element={<DashboardPage />} index />
        <Route element={<Worker backPath="/dashboard" />} path="workers/:peerId" />
      </Route>
      {/* 
      
      <Route element={<NetworkLayout />} path="/delegations">
        <Route element={<DelegationsPage />} index />
        <Route element={<Worker backPath="/delegations" />} path="workers/:peerId" />
      </Route>
       */}
      <Route element={<NetworkLayout />} path="/workers">
        <Route element={<AddNewWorker />} path="add" />
        <Route element={<Worker backPath="/profile/workers" />} path=":peerId" />
        <Route element={<WorkerEdit />} path=":peerId/edit" />
      </Route>
      <Route element={<NetworkLayout />} path="/gateways">
        <Route element={<AddNewGateway />} path="add" />
        <Route element={<Gateway backPath="/profile/gateways" />} path=":peerId" />
      </Route>
      <Route element={<NetworkLayout />} path="/profile">
        <Route element={<ProfilePage />} path="">
          <Route element={<MyDelegations />} path="delegations" />
          <Route element={<MyWorkers />} path="workers" />
          <Route element={<MyGateways />} path="gateways" />
          <Route element={<Navigate to="delegations" replace={true} />} index />
        </Route>
      </Route>

      <Route element={<Navigate to="/dashboard" replace={true} />} path="*" />
    </Routes>
  );
};
