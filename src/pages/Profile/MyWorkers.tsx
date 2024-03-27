import React from 'react';

import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyWorkers } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

import { WorkerName } from '../WorkersPage/WorkerName';

export function MyWorkers() {
  const navigate = useNavigate();
  const { data, isLoading } = useMyWorkers();

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle
        title="My workers"
        endAdornment={
          <Stack direction="row" spacing={2}>
            <Link to="/profile/workers/add">
              <Button variant="contained">Add worker</Button>
            </Link>
          </Stack>
        }
      />
      {data.length ? (
        <BorderedTable>
          <TableHead>
            <TableRow>
              <TableCell>Worker</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uptime last 24 hours</TableCell>
              <TableCell>Uptime last 90 days</TableCell>
              <TableCell>APR</TableCell>
              <TableCell>Total delegated</TableCell>
              <TableCell>Claimable rewards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(worker => {
              return (
                <TableRow
                  onClick={() => navigate(`/profile/workers/${worker.peerId}`)}
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
                  <TableCell>{percentFormatter(worker.apr)}</TableCell>
                  <TableCell>{formatSqd(worker.totalDelegations.total)}</TableCell>
                  <TableCell>{formatSqd(worker.claimableReward)}</TableCell>
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
