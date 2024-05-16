import React from 'react';

import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useVestingContracts } from '@api/contracts/vesting';
import { useMyAssets } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';

import { ReleaseButton } from './ReleaseButton';
import { VestingName } from './VestingName';

export function MyVestings() {
  const navigate = useNavigate();
  const { assets, isLoading } = useMyAssets();
  const { data, isLoading: isVestingsLoading } = useVestingContracts({
    addresses: assets?.vestings.map(v => v.address as `0x${string}`),
  });
  const { SQD_TOKEN } = useContracts();

  if (isLoading || isVestingsLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle title="My Vesting" />
      {assets.vestings.length ? (
        <BorderedTable>
          <TableHead>
            <TableRow>
              <TableCell>Vesting</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Releasable</TableCell>
              <TableCell>Released</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.vestings.map((vesting, i) => {
              const d = data?.[i];
              return (
                <TableRow
                  onClick={() => navigate(`vestings/${vesting.address}`)}
                  className="hoverable"
                  key={vesting.address}
                >
                  <TableCell>
                    <VestingName vesting={vesting} />
                  </TableCell>
                  <TableCell>{formatSqd(SQD_TOKEN, fromSqd(d?.balance))}</TableCell>
                  <TableCell>{formatSqd(SQD_TOKEN, d?.releasable)}</TableCell>
                  <TableCell>{formatSqd(SQD_TOKEN, d?.released)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <ReleaseButton vesting={vesting} />
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
