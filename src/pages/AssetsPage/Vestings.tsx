import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { useVestingContracts } from '@api/contracts/vesting';
import { useMyAssets } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { NoItems } from '@components/NoItems';
import Placeholder from '@components/Placeholer';
import { DashboardTable } from '@components/Table/DashboardTable';
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
    <DashboardTable
      loading={isLoading || isVestingsLoading}
      title={<SquaredChip label="My Vestings" color="primary" />}
    >
      <TableHead>
        <TableRow>
          <TableCell>Vesting</TableCell>
          <TableCell>Balance</TableCell>
          <TableCell>Deposited</TableCell>
          <TableCell>Releasable</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {assets.vestings.length ? (
          <>
            {assets.vestings.map((vesting, i) => {
              const d = data?.[i];
              return (
                <TableRow key={vesting.id}>
                  <TableCell>
                    <SourceWalletName source={vesting} to={`vestings/${vesting.id}`} />
                  </TableCell>
                  <TableCell>{tokenFormatter(fromSqd(d?.balance), SQD_TOKEN)}</TableCell>
                  <TableCell>{tokenFormatter(fromSqd(d?.deposited), SQD_TOKEN)}</TableCell>
                  <TableCell>{tokenFormatter(fromSqd(d?.releasable), SQD_TOKEN)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <ReleaseButton vesting={vesting} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <Placeholder>
            <NoItems />
          </Placeholder>
        )}
      </TableBody>
    </DashboardTable>
  );
}
