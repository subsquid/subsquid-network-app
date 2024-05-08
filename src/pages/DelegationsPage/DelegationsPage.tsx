import React from 'react';

import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyDelegations } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';
import { WorkerUndelegate } from '@pages/WorkersPage/WorkerUndelegate';

export function MyDelegations() {
  const navigate = useNavigate();
  const { delegations, isLoading } = useMyDelegations();
  const { SQD_TOKEN } = useContracts();

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle title="My delegations" />
      <ConnectedWalletRequired>
        {delegations.length ? (
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell>Worker</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Uptime last 24h</TableCell>
                <TableCell>Delegation</TableCell>
                <TableCell>APR</TableCell>
                <TableCell>Total reward</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {delegations.map(d => {
                return (
                  <TableRow
                    onClick={() => navigate(`/delegations/workers/${d.worker.peerId}`)}
                    className="hoverable"
                    key={d.worker.peerId}
                  >
                    <TableCell>
                      <WorkerName worker={d.worker} />
                    </TableCell>
                    <TableCell>
                      <WorkerStatus worker={d.worker} />
                    </TableCell>
                    <TableCell>{percentFormatter(d.worker.uptime24Hours)}</TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, d.deposit)}</TableCell>
                    <TableCell>{percentFormatter(d.worker.stakerApr)}</TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, d.totalReward)}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2}>
                        <WorkerDelegate worker={d.worker} />
                        <WorkerUndelegate worker={d.worker} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </BorderedTable>
        ) : (
          <Card sx={{ textAlign: 'center' }}>No items to show</Card>
        )}
      </ConnectedWalletRequired>
    </Box>
  );
}

export function DelegationsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <MyDelegations />
      <Outlet />
    </CenteredPageWrapper>
  );
}
