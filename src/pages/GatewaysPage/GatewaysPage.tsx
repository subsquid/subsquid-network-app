import React from 'react';

import { dateFormat } from '@i18n';
import { Box, Button, Stack, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { formatSqd } from '@api/contracts/utils';
import { useMyGateways } from '@api/subsquid-network-squid/gateways-graphql';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { BorderedTable } from '@components/Table/BorderedTable';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { GatewayName } from '@pages/GatewaysPage/GatewayName';

export function MyGateways() {
  const navigate = useNavigate();
  const { data, isLoading } = useMyGateways();

  if (isLoading) return <Loader />;

  return (
    <Box>
      <NetworkPageTitle
        title="My gateways"
        endAdornment={
          <Stack direction="row" spacing={2}>
            <Button variant="contained" component={Link} to="/gateways/add">
              Add gateway
            </Button>
          </Stack>
        }
      />
      <ConnectedWalletRequired>
        {data.length ? (
          <BorderedTable>
            <TableHead>
              <TableRow>
                <TableCell>Gateway</TableCell>
                <TableCell>Pending lock</TableCell>
                <TableCell>Locked</TableCell>
                <TableCell>Created</TableCell>
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
                    <TableCell>{formatSqd(gateway.pendingStaked)}</TableCell>
                    <TableCell>{formatSqd(gateway.totalStaked)}</TableCell>
                    <TableCell>{dateFormat(gateway.createdAt)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </BorderedTable>
        ) : (
          <Card sx={{ textAlign: 'center' }}>No items to show</Card>
        )}
      </ConnectedWalletRequired>
    </Box>
  );
}

export function GatewaysPage() {
  return (
    <CenteredPageWrapper className="wide">
      <MyGateways />
      <Outlet />
    </CenteredPageWrapper>
  );
}