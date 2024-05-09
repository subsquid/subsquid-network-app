import React from 'react';

import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Button, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyWorkers } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

export function MyWorkers() {
  const navigate = useNavigate();

  const { data, isLoading } = useMyWorkers();
  const { isConnected } = useAccount();
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <NetworkPageTitle
        title="My Workers"
        endAdornment={
          <Button variant="contained" disabled={!isConnected} component={Link} to="/workers/add">
            Add worker
          </Button>
        }
      />
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <BorderedTable>
          <TableHead>
            <TableRow>
              <TableCell width={275}>Worker</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uptime, 24h</TableCell>
              <TableCell>APR, 7d</TableCell>
              <TableCell>Total reward</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(worker => {
              return (
                <TableRow
                  onClick={() => navigate(`/workers/${worker.peerId}`)}
                  className="hoverable"
                  key={worker.peerId}
                >
                  <TableCell>
                    <WorkerName worker={worker} />
                  </TableCell>
                  <TableCell>
                    <WorkerStatus worker={worker} />
                  </TableCell>
                  <TableCell>{percentFormatter(worker.uptime24Hours)}</TableCell>
                  <TableCell>{percentFormatter(worker.apr)}</TableCell>
                  <TableCell>{formatSqd(SQD_TOKEN, worker.totalReward)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <WorkerDelegate worker={worker} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </BorderedTable>
      ) : (
        <Card sx={{ textAlign: 'center' }}>No items to show</Card>
      )}
    </Box>
  );
}

export function WorkersPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyWorkers />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
