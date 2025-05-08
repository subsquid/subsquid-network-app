import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, unwrapMulticallResult } from '@lib/network/utils';
import { Box, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { keepPreviousData } from '@tanstack/react-query';
import chunk from 'lodash-es/chunk';
import { erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';

import { vestingAbi } from '@api/contracts';
import { AccountType, useSourcesQuery, useSquid } from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { DashboardTable, NoItems } from '@components/Table';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

import { ReleaseButton } from './ReleaseButton';
import { SourceWalletName } from './VestingName';

export function MyVestings() {
  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading } = useSourcesQuery(squid, {
    address: account.address as `0x${string}`,
  });
  const { SQD_TOKEN, SQD } = useContracts();

  const vestingsQuery = {
    accounts: sourcesQuery?.accounts.filter(s => s.type === AccountType.Vesting),
  };

  const { data: vestings, isLoading: isVestingsLoading } = useReadContracts({
    contracts: vestingsQuery.accounts?.flatMap(s => {
      if (s.type !== AccountType.Vesting) return [];

      const vestingContract = { abi: vestingAbi, address: s.id as `0x${string}` } as const;
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
          abi: erc20Abi,
          address: SQD,
          functionName: 'balanceOf',
          args: [s.id as `0x${string}`],
        },
      ] as const;
    }),
    allowFailure: true,
    query: {
      enabled: !!vestingsQuery.accounts?.length,
      placeholderData: keepPreviousData,
      select: res => {
        if (res?.some(r => r.status === 'success')) {
          return chunk(res, 3).map(ch => ({
            deposited: unwrapMulticallResult(ch[0]),
            releasable: unwrapMulticallResult(ch[1]),
            balance: unwrapMulticallResult(ch[2]),
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
        {vestingsQuery.accounts?.length ? (
          <>
            {vestingsQuery.accounts.map((vesting, i) => {
              const d = vestings?.[i];
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
                      <ReleaseButton vesting={vesting} disabled={!d?.releasable} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : isLoading ? null : (
          <NoItems>
            <span>No vesting was found</span>
          </NoItems>
        )}
      </TableBody>
    </DashboardTable>
  );
}
