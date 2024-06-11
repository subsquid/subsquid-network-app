import { useMemo } from 'react';

import { percentFormatter, tokenFormatter } from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import BigNumber from 'bignumber.js';
import { keyBy, mapValues } from 'lodash-es';
import { Outlet } from 'react-router-dom';

import { useMyDelegations } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { DelegationCapacity } from '@pages/WorkersPage/DelegationCapacity';
import { WorkerDelegate } from '@pages/WorkersPage/WorkerDelegate';
import { WorkerName } from '@pages/WorkersPage/WorkerName';
import { WorkerStatus } from '@pages/WorkersPage/WorkerStatus';
import { WorkerUndelegate } from '@pages/WorkersPage/WorkerUndelegate';

export function MyDelegations() {
  const { workers: delegations, isLoading } = useMyDelegations();
  const { SQD_TOKEN } = useContracts();

  const groupedDelegations = useMemo(() => {
    return mapValues(
      keyBy(delegations, w => w.id),
      w => {
        return w.delegations.reduce(
          (s, d) => {
            s.deposit = s.deposit.plus(d.deposit);
            s.reward = s.reward.plus(d.claimedReward).plus(d.claimableReward);
            return s;
          },
          {
            deposit: new BigNumber(0),
            reward: new BigNumber(0),
          },
        );
      },
    );
  }, [delegations]);

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
                <TableCell className="pinned" width={240}>
                  Worker
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delegator APR</TableCell>
                <TableCell>Delegation capacity</TableCell>
                <TableCell>My Delegation</TableCell>
                <TableCell>Total reward</TableCell>
                <TableCell className="pinned"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {delegations.map(worker => {
                return (
                  <TableRow key={worker.peerId}>
                    <TableCell className="pinned">
                      <WorkerName
                        worker={worker}
                        to={`/workers/${worker.peerId}?backPath=/delegations`}
                      />
                    </TableCell>
                    <TableCell>
                      <WorkerStatus worker={worker} />
                    </TableCell>
                    <TableCell>
                      {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                    </TableCell>
                    <TableCell>
                      <DelegationCapacity worker={worker} />
                    </TableCell>
                    <TableCell>
                      {tokenFormatter(fromSqd(groupedDelegations[worker.id].deposit), SQD_TOKEN)}
                    </TableCell>
                    <TableCell>
                      {tokenFormatter(fromSqd(groupedDelegations[worker.id].reward), SQD_TOKEN)}
                    </TableCell>
                    <TableCell className="pinned">
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
