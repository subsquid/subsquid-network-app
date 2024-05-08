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
              {delegations.map(d => {
                return (
                  <TableRow
                    onClick={() => navigate(`/workers/${d.worker.peerId}?backPath=/delegations`)}
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
                    <TableCell>{percentFormatter(d.worker.uptime90Days)}</TableCell>
                    <TableCell>{percentFormatter(d.worker.stakerApr)}</TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, d.deposit)}</TableCell>
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
