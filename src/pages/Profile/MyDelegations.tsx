import React from 'react';

import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyDelegations } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

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
                <TableCell>Uptime last 90 days</TableCell>
                <TableCell>APR</TableCell>
                <TableCell>My delegation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {delegations.map(worker => {
                return (
                  <TableRow
                    onClick={() => navigate(`/workers/${worker.peerId}?backPath=/delegations`)}
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
                    <TableCell>{percentFormatter(worker.uptime90Days)}</TableCell>
                    <TableCell>{percentFormatter(worker.stakerApr)}</TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, worker.myDelegationsTotal)}</TableCell>
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
