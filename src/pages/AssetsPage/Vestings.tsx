import { tokenFormatter, addressFormatter } from '@lib/formatters/formatters';
import { fromSqd, unwrapMulticallResult } from '@lib/network/utils';
import { Box, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import { keepPreviousData } from '@tanstack/react-query';
import chunk from 'lodash-es/chunk';
import { erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';
import { Link } from 'react-router-dom';

import { vestingAbi } from '@api/contracts';
import {
  AccountType,
  useSourcesQuery,
  useSquid,
  createDefaultVesting,
} from '@api/subsquid-network-squid';
import { SquaredChip } from '@components/Chip';
import { DashboardTable, NoItems } from '@components/Table';
import { NameWithAvatar } from '@components/SourceWalletName';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { SkeletonWrapper } from '@components/SkeletonWrapper';
import { useMemo } from 'react';
import { CopyToClipboard } from '@components/CopyToClipboard';

import { ReleaseButton } from './ReleaseButton';

const StyledTableRow = styled(TableRow)({
  minHeight: '48px',
  '& td': {
    height: '48px',
  },
});

export function MyVestings() {
  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading: isSourcesLoading } = useSourcesQuery({
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

  const isLoading = isSourcesLoading || isVestingsLoading;

  const data = useMemo(
    () =>
      isLoading
        ? Array.from({ length: 3 }, (_, index) => createDefaultVesting(index))
        : vestingsQuery.accounts?.map((vesting, i) => ({
            ...vesting,
            ...vestings?.[i],
          })),
    [isLoading, vestingsQuery.accounts, vestings],
  );

  return (
    <DashboardTable title={<SquaredChip label="My Vestings" color="primary" />}>
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
        {data?.length ? (
          data.map(vesting => (
            <StyledTableRow key={vesting.id}>
              <TableCell>
                <NameWithAvatar
                  title="Vesting contract"
                  subtitle={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CopyToClipboard
                        text={vesting.id}
                        content={
                          <Link to={`/assets/vestings/${vesting.id}`}>
                            {addressFormatter(vesting.id, true)}
                          </Link>
                        }
                      />
                    </Box>
                  }
                  avatarValue={vesting.id}
                  loading={isLoading}
                  sx={{ width: { xs: 200, sm: 240 } }}
                />
              </TableCell>
              <TableCell>
                <SkeletonWrapper loading={isLoading}>
                  <span>{tokenFormatter(fromSqd(vesting.balance), SQD_TOKEN)}</span>
                </SkeletonWrapper>
              </TableCell>
              <TableCell>
                <SkeletonWrapper loading={isLoading}>
                  <span>{tokenFormatter(fromSqd(vesting.deposited), SQD_TOKEN)}</span>
                </SkeletonWrapper>
              </TableCell>
              <TableCell>
                <SkeletonWrapper loading={isLoading}>
                  <span>{tokenFormatter(fromSqd(vesting.releasable), SQD_TOKEN)}</span>
                </SkeletonWrapper>
              </TableCell>
              <TableCell>
                <Box display="flex" justifyContent="flex-end">
                  <SkeletonWrapper loading={isLoading}>
                    <ReleaseButton vesting={vesting} disabled={!vesting.releasable} />
                  </SkeletonWrapper>
                </Box>
              </TableCell>
            </StyledTableRow>
          ))
        ) : (
          <NoItems>
            <span>No vesting was found</span>
          </NoItems>
        )}
      </TableBody>
    </DashboardTable>
  );
}
