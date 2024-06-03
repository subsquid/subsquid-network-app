import { percentFormatter } from '@lib/formatters/formatters.ts';
import { Box, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyDelegations } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';
import { WorkerUndelegate } from '@pages/WorkersPage/WorkerUndelegate';

export function MyDelegations() {
  const { delegations, isLoading } = useMyDelegations();
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <NetworkPageTitle title="My Delegations" />
      {isLoading ? (
        <Loader />
      ) : delegations.length ? (
        <Card noPadding>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell width={275}>Worker</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delegation</TableCell>
                <TableCell>APR</TableCell>
                <TableCell>Total reward</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {delegations.map(worker => {
                return (
                  <TableRow className="hoverable" key={worker.peerId}>
                    <TableCell>
                      <WorkerName
                        worker={worker}
                        to={`/workers/${worker.peerId}?backPath=/delegations`}
                      />
                    </TableCell>
                    <TableCell>
                      <WorkerStatus worker={worker} />
                    </TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, worker.myDelegationsTotal)}</TableCell>
                    <TableCell>
                      {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                    </TableCell>
                    <TableCell>{formatSqd(SQD_TOKEN, worker.myDelegationsRewardsTotal)}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <WorkerDelegate worker={worker} />
                        <WorkerUndelegate worker={worker} />
                      </Stack>
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

export function DelegationsPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyDelegations />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
