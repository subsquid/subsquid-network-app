import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, unwrapMulticallResult } from '@lib/network/utils';
import { Warning } from '@mui/icons-material';
import { Alert, Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { keepPreviousData } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import { erc20Abi } from 'viem';
import { useReadContracts } from 'wagmi';

import { useSourcesQuery, useSquid } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { DashboardTable, NoItems } from '@components/Table';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

import { DepositButton } from './DepositButton';
import { SourceWalletName } from './OtcName';

export function OtcContracts() {
  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading: isSourcesQueryLoading } = useSourcesQuery(squid, {
    address: account.address as `0x${string}`,
  });
  const { SQD_TOKEN, SQD, OTC } = useContracts();

  const OTCs = [OTC];
  const sources = sourcesQuery?.accounts;

  const { data: balances, isLoading: isBalancesLoading } = useReadContracts({
    contracts: OTCs.flatMap(s => {
      return [
        {
          abi: erc20Abi,
          address: SQD,
          functionName: 'balanceOf',
          args: [s as `0x${string}`],
        },
      ] as const;
    }),
    allowFailure: true,
    query: {
      placeholderData: keepPreviousData,
      select: res => {
        if (res?.some(r => r.status === 'success')) {
          return res.map(v => ({
            balance: unwrapMulticallResult(v),
          }));
        } else if (res?.length === 0) {
          return [];
        }

        return undefined;
      },
    },
  });

  const isLoading = isSourcesQueryLoading || isBalancesLoading;

  return (
    <DashboardTable
      loading={isLoading}
      title={<SquaredChip label="OTC Contracts" color="primary" />}
    >
      <TableHead>
        <TableRow>
          <TableCell>Contract</TableCell>
          <TableCell>Balance</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {OTCs.length ? (
          <>
            {OTCs.map((address, i) => {
              const d = balances?.[i];
              return (
                <TableRow key={address}>
                  <TableCell>
                    <SourceWalletName source={{ id: address }} />
                  </TableCell>
                  <TableCell>{tokenFormatter(fromSqd(d?.balance), SQD_TOKEN)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <DepositButton otc={address} sources={sources} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <NoItems>
            <span>No vesting was found</span>
          </NoItems>
        )}
      </TableBody>
    </DashboardTable>
  );
}

export function OtcContractsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <Alert sx={{ mb: 2 }} color="warning" icon={<Warning color="warning" />}>
          <Typography>
            Please do not deposit tokens until you know what you are doing. It won't be possible to
            return them back!
          </Typography>
        </Alert>
        <OtcContracts />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
