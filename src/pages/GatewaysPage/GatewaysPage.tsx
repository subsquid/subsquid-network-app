import React from 'react';

import { dateFormat } from '@i18n';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyGateways, useMyGatewayStakes } from '@api/subsquid-network-squid/gateways-graphql';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { GatewayName } from '@pages/GatewaysPage/GatewayName';

import { GatewayStake } from './GatewayStake';
import { GatewayStatus } from './GatewayStatus';
import { GatewayUnregister } from './GatewayUnregister';
import { GatewayUnstake } from './GatewayUnstake';

export function MyStakes() {
  const { data, isLoading } = useMyGatewayStakes();
  const { SQD_TOKEN } = useContracts();

  return (
    <Box>
      <NetworkPageTitle title="My Stakes" endAdornment={<GatewayStake />} />
      {isLoading ? (
        <Loader />
      ) : (
        <Card noPadding>
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell>Pending</TableCell>
                <TableCell>Active</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow key={data?.account.id}>
                <TableCell>
                  {data?.pendingStake ? formatSqd(SQD_TOKEN, data?.pendingStake?.amount) : '-'}
                </TableCell>
                <TableCell>
                  {data?.pendingStake ? formatSqd(SQD_TOKEN, data?.stake?.amount) : '-'}
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="flex-end">
                    <GatewayUnstake operator={data} />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </BorderedTable>
        </Card>
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
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(gateway => {
                return (
                  <TableRow
                    onClick={() => navigate(`/gateways/${gateway.id}`)}
                    className="hoverable"
                    key={gateway.id}
                  >
                    <TableCell>
                      <GatewayName gateway={gateway} />
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
