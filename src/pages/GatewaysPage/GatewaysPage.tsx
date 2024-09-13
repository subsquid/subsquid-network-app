import React, { useMemo } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

import { useMyGateways, useMyGatewayStake } from '@api/subsquid-network-squid/gateways-graphql';
import SquaredChip from '@components/Chip/SquaredChip';
import { DashboardTable, NoItems } from '@components/Table';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useContracts } from '@network/useContracts';
import { ColumnLabel, ColumnValue, SummarySection } from '@pages/DashboardPage/Summary';

import { AutoExtension } from './AutoExtension';
import { GatewayName } from './GatewayName';
import { GatewayStake } from './GatewayStake';
import { GatewayUnregister } from './GatewayUnregister';
import { GatewayUnstake } from './GatewayUnstake';

export function MyStakes() {
  const theme = useTheme();
  const narrowXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { data: stake, isLoading: isStakeLoading } = useMyGatewayStake();
  const { SQD_TOKEN } = useContracts();

  const unlockDate = useMemo(() => {
    if (!stake?.stake) return;
    if (!stake.stake.lockEnd) return;

    return (
      (Number(stake.stake.lockEnd) - stake.lastBlockL1 + 1) * 12_000 +
      new Date(stake.lastBlockTimestampL1).getTime()
    );
  }, [stake]);

  return (
    <>
      <Box minHeight={256} mb={2} display="flex">
        <SummarySection
          loading={isStakeLoading}
          sx={{ width: 1 }}
          title={<SquaredChip label="Lock Info" color="primary" />}
          action={
            <Stack direction="row" spacing={2}>
              <GatewayStake />
              <GatewayUnstake />
            </Stack>
          }
        >
          <Stack direction="column" flex={1}>
            <Box alignSelf="end">
              <AutoExtension stake={stake?.stake} />
            </Box>
            <Stack
              divider={<Divider flexItem />}
              spacing={1}
              direction={narrowXs ? 'column' : 'row'}
              alignItems={narrowXs ? 'stretch' : 'flex-end'}
              height={1}
              justifyContent="stretch"
              width={0.75}
            >
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <Box>
                  <ColumnLabel>Amount</ColumnLabel>
                  <ColumnValue>
                    {tokenFormatter(fromSqd(stake?.stake?.amount), SQD_TOKEN, 3)}
                  </ColumnValue>
                </Box>
                <Box>
                  <ColumnLabel>
                    <Stack direction="row" spacing={1}>
                      <span>Allocated CUs</span>
                      {stake?.stake?.computationUnitsPending ? (
                        <SquaredChip label="Pending" color="warning" />
                      ) : stake?.stake?.locked ? (
                        <SquaredChip label="Active" color="info" />
                      ) : (
                        <SquaredChip label="Expired" color="error" />
                      )}
                    </Stack>
                  </ColumnLabel>
                  <ColumnValue>
                    {numberWithCommasFormatter(stake?.stake?.computationUnits || 0)}
                    {stake?.stake?.computationUnitsPending
                      ? ` (${numberWithCommasFormatter(stake?.stake?.computationUnitsPending)})`
                      : ``}
                  </ColumnValue>
                </Box>
              </Stack>
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <Box>
                  <ColumnLabel>Unlocked At</ColumnLabel>
                  <ColumnValue>
                    {unlockDate && !stake?.stake?.autoExtension
                      ? dateFormat(unlockDate, narrowXs ? 'date' : 'dateTime')
                      : '-'}
                  </ColumnValue>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </SummarySection>
      </Box>
    </>
  );
}

export function MyGateways() {
  const { data: gateways, isLoading: isGatewaysLoading } = useMyGateways();

  return (
    <DashboardTable
      loading={isGatewaysLoading}
      title={
        <>
          <SquaredChip label="My Portals" color="primary" />
          <Button
            color="info"
            startIcon={<Add />}
            variant="contained"
            component={Link}
            to="/portals/add"
          >
            ADD PORTAL
          </Button>
        </>
      }
    >
      <TableHead>
        <TableRow>
          <TableCell>Gateway</TableCell>
          <TableCell>Registered</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gateways.length ? (
          <>
            {gateways.map(gateway => {
              return (
                <TableRow key={gateway.id}>
                  <TableCell>
                    <GatewayName gateway={gateway} to={`/portals/${gateway.id}`} />
                  </TableCell>
                  <TableCell>{dateFormat(gateway.createdAt)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <GatewayUnregister gateway={gateway} />
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

export function GatewaysPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <MyStakes />
        <MyGateways />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
