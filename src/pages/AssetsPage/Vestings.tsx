import React from 'react';

import { addressFormatter, percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyAssets, useMyWorkers } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';

export function MyVestings() {
  const navigate = useNavigate();
  const { assets, isLoading } = useMyAssets();
  const { SQD_TOKEN } = useContracts();

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle title="My vestings" />
      {assets.vestings.length ? (
        <BorderedTable>
          <TableHead>
            <TableRow>
              <TableCell>Vesting</TableCell>
              <TableCell>Value</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.vestings.map(vesting => {
              return (
                <TableRow
                  onClick={() => navigate(`vestings/${vesting.address}`)}
                  className="hoverable"
                  key={vesting.address}
                >
                  <TableCell>{addressFormatter(vesting.address, true)}</TableCell>
                  <TableCell>{formatSqd(SQD_TOKEN, vesting.balance)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <Button variant="contained">Release</Button>
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
