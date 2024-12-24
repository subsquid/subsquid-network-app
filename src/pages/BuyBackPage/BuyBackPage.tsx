import { Warning } from '@mui/icons-material';
import { Alert, Box, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useSourcesQuery, useSquid } from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { DashboardTable, NoItems } from '@components/Table';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

import { SourceWalletName } from './BuyBackName';
import { DepositButton } from './DepositButton';

export function OtcContracts() {
  const account = useAccount();
  const squid = useSquid();

  const { data: sourcesQuery, isLoading: isSourcesQueryLoading } = useSourcesQuery(squid, {
    address: account.address as `0x${string}`,
  });
  const { BUYBACK } = useContracts();

  const BUYBACKs = [BUYBACK];
  const sources = sourcesQuery?.accounts;

  const isLoading = isSourcesQueryLoading;

  return (
    <DashboardTable loading={isLoading} title={<SquaredChip label="Buy Back" color="primary" />}>
      <TableHead>
        <TableRow>
          <TableCell>Contract</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {BUYBACKs.length ? (
          <>
            {BUYBACKs.map(address => {
              return (
                <TableRow key={address}>
                  <TableCell>
                    <SourceWalletName source={{ id: address }} />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <DepositButton address={address} sources={sources} />
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

export function BuyBacksPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <Alert sx={{ mb: 2 }} color="warning" icon={<Warning color="warning" />}>
          <Typography>
            Please do not deposit tokens until you know what you are doing. It will not be possible
            to return them back!
          </Typography>
        </Alert>
        <OtcContracts />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
