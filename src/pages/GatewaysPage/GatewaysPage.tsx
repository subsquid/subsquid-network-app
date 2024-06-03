import React from 'react';

import { dateFormat } from '@i18n';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMySources } from '@api/subsquid-network-squid';
import { useMyGateways, useMyGatewayStakes } from '@api/subsquid-network-squid/gateways-graphql';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { SourceWalletName } from '@pages/AssetsPage/VestingName';
import { GatewayName } from '@pages/GatewaysPage/GatewayName';

import { GatewayStake } from './GatewayStake';
import { GatewayStatus } from './GatewayStatus';
import { GatewayUnregister } from './GatewayUnregister';
import { GatewayUnstake } from './GatewayUnstake';

export function MyStakes() {
  const { data, isLoading } = useMyGatewayStakes();
  const { sources } = useMySources();
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <NetworkPageTitle title="My Locks" endAdornment={<GatewayStake />} />
      {isLoading ? (
        <Loader />
      ) : data?.length ? (
        <Card noPadding>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell>Operator</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>Active</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((o, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <SourceWalletName source={o.account} />
                    </TableCell>
                    <TableCell>
                      {o.pendingStake ? formatSqd(SQD_TOKEN, o.pendingStake?.amount) : '-'}
                    </TableCell>
                    <TableCell>{o.stake ? formatSqd(SQD_TOKEN, o.stake?.amount) : '-'}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <GatewayUnstake operator={o} />
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

export function MyGateways() {
  const navigate = useNavigate();
  const { data, isLoading } = useMyGateways();

  return (
    <Box>
      <NetworkPageTitle
        title="My Gateways"
        endAdornment={
          <Stack direction="row" spacing={2}>
            <Button variant="contained" component={Link} to="/gateways/add">
              Add gateway
            </Button>
          </Stack>
        }
      />
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <Card noPadding>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell>Gateway</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(gateway => {
                return (
                  <TableRow className="hoverable" key={gateway.id}>
                    <TableCell>
                      <GatewayName gateway={gateway} to={`/gateways/${gateway.id}`} />
                    </TableCell>
                    <TableCell>
                      <GatewayStatus gateway={gateway} />
                    </TableCell>
                    <TableCell>{dateFormat(gateway.createdAt, 'date')}</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="flex-end">
                        <GatewayUnregister gateway={gateway} />
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

export function GatewaysPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyStakes />
        <Box sx={{ height: 64 }} />
        <MyGateways />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
