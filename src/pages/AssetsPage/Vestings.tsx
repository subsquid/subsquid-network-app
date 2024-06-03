import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useVestingContracts } from '@api/contracts/vesting';
import { useMyAssets } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';

import { ReleaseButton } from './ReleaseButton';
import { SourceWalletName } from './VestingName';

export function MyVestings() {
  const { assets, isLoading } = useMyAssets();
  const { data, isLoading: isVestingsLoading } = useVestingContracts({
    addresses: assets.vestings.map(v => v.id as `0x${string}`),
  });
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <NetworkPageTitle title="My Vesting" />
      {isLoading || isVestingsLoading ? (
        <Loader />
      ) : assets.vestings.length ? (
        <Card noPadding>
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
                  <TableRow className="hoverable" key={vesting.id}>
                    <TableCell>
                      <SourceWalletName source={vesting} to={`vestings/${vesting.id}`} />
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
        </Card>
      ) : (
        <Card sx={{ textAlign: 'center' }}>No items to show</Card>
      )}
    </Box>
  );
}
