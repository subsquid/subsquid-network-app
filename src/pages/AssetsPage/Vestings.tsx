import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, unwrapMulticallResult } from '@lib/network/utils';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { keepPreviousData } from '@tanstack/react-query';
import chunk from 'lodash-es/chunk';
import { useReadContracts } from 'wagmi';

import { sqdAbi, vestingAbi } from '@api/contracts';
import { useMyAssets } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { DashboardTable, NoItems } from '@components/Table';
import { useContracts } from '@network/useContracts';

import { ReleaseButton } from './ReleaseButton';
import { SourceWalletName } from './VestingName';

export function MyVestings() {
  const { assets, isLoading } = useMyAssets();
  const { SQD_TOKEN, SQD } = useContracts();

  const { data, isLoading: isVestingsLoading } = useReadContracts({
    contracts: assets.vestings?.flatMap(address => {
      const vestingContract = { abi: vestingAbi, address: address.id as `0x${string}` } as const;
      return [
        {
          ...vestingContract,
          functionName: 'depositedIntoProtocol',
        },
        {
          ...vestingContract,
          functionName: 'releasable',
          args: [SQD],
        },
        {
          ...vestingContract,
          functionName: 'released',
          args: [SQD],
        },
        {
          abi: sqdAbi,
          address: SQD,
          functionName: 'balanceOf',
          args: [address],
        },
      ] as const;
    }),
    allowFailure: true,
    query: {
      enabled: !!assets?.vestings?.length,
      placeholderData: keepPreviousData,
      select: res => {
        if (res?.some(r => r.status === 'success')) {
          return chunk(res, 3).map(ch => ({
            deposited: unwrapMulticallResult(ch[0])?.toString(),
            releasable: unwrapMulticallResult(ch[1])?.toString(),
            balance: unwrapMulticallResult(ch[2])?.toString(),
          }));
        } else if (res?.length === 0) {
          return [];
        }

        return undefined;
      },
    },
  });

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
                      <ReleaseButton
                        vesting={vesting}
                        disabled={!d?.releasable || d.releasable === '0'}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <NoItems />
        )}
      </TableBody>
    </DashboardTable>
  );
}
