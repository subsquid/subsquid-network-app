import React, { useMemo, useState } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import { ExpandMore, Info } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useBlock } from 'wagmi';

import {
  useReadGatewayRegistryComputationUnitsAmount,
  useReadGatewayRegistryGetStake,
  useReadNetworkControllerWorkerEpochLength,
  useReadRouterNetworkController,
} from '@api/contracts';
import {
  AccountType,
  useMyGatewaysQuery,
  useMySources,
  useSquid,
} from '@api/subsquid-network-squid';
import SquaredChip from '@components/Chip/SquaredChip';
import { HelpTooltip } from '@components/HelpTooltip';
import { DashboardTable, NoItems } from '@components/Table';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { ColumnLabel, ColumnValue, SummarySection } from '@pages/DashboardPage/Summary';

import { AddGatewayButton } from './AddNewGateway';
import { AutoExtension } from './AutoExtension';
import { GatewayName } from './GatewayName';
import { GatewayStakeButton } from './GatewayStake';
import { GatewayUnregisterButton } from './GatewayUnregister';
import { GatewayUnstakeButton } from './GatewayUnstake';

export function MyStakes() {
  const theme = useTheme();
  const narrowXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { address } = useAccount();

  const { GATEWAY_REGISTRATION, ROUTER, SQD_TOKEN, l1ChainId } = useContracts();

  const { data: stake, isLoading: isStakeLoading } = useReadGatewayRegistryGetStake({
    address: GATEWAY_REGISTRATION,
    args: [address || '0x'],
  });
  const { data: cuAmount, isLoading: isCuAmountLoading } =
    useReadGatewayRegistryComputationUnitsAmount({
      address: GATEWAY_REGISTRATION,
      args: [stake?.amount || 0n, stake?.duration || 0n],
    });
  const { data: sources, isLoading: isSourcesLoading } = useMySources({
    select: res => {
      return res?.map(s => ({
        ...s,
        stake:
          s.type === AccountType.User
            ? {
                amount: stake?.amount || 0n,
                duration: stake?.duration || 0n,
              }
            : {
                amount: 0n,
                duration: 0n,
              },
      }));
    },
  });

  const { data: lastL1Block, isLoading: isL1BlockLoading } = useBlock({
    chainId: l1ChainId,
    includeTransactions: false,
  });
  const { data: unlockedAtL1Block, isLoading: isUnlockedAtBlockLoading } = useBlock({
    chainId: l1ChainId,
    blockNumber: stake?.lockEnd,
    includeTransactions: false,
    query: {
      enabled: stake && stake?.lockEnd <= (lastL1Block?.number || 0n),
    },
  });

  const { data: workerEpochLength, isLoading: isWorkerEpochLengthLoading } =
    useReadNetworkControllerWorkerEpochLength({
      address: useReadRouterNetworkController({ address: ROUTER }).data,
    });

  const isLoading =
    isStakeLoading ||
    isCuAmountLoading ||
    isL1BlockLoading ||
    isWorkerEpochLengthLoading ||
    isUnlockedAtBlockLoading ||
    isSourcesLoading;

  const isPending = !!stake?.amount && stake.lockStart > (lastL1Block?.number || 0n);
  const isActive =
    !!stake?.amount &&
    stake.lockStart <= (lastL1Block?.number || 0n) &&
    stake.lockEnd >= (lastL1Block?.number || 0n);
  const isExpired = !!stake?.amount && stake.lockEnd < (lastL1Block?.number || 0n);

  const unlockDate = useMemo(() => {
    if (!stake || !lastL1Block) return;

    if (stake.lockEnd < lastL1Block.number) return (unlockedAtL1Block?.timestamp || 0n) * 1000n;

    return ((stake.lockEnd - lastL1Block.number + 1n) * 12n + lastL1Block.timestamp) * 1000n;
  }, [lastL1Block, stake, unlockedAtL1Block?.timestamp]);

  const cuPerEpoch = useMemo(() => {
    if (!stake?.lockEnd || !workerEpochLength || !lastL1Block || isExpired) return 0;

    const computationUnits = stake.lockStart > lastL1Block.number ? stake.oldCUs : cuAmount || 0n;
    if (stake.duration < workerEpochLength) return computationUnits;

    return (computationUnits * workerEpochLength) / stake.duration;
  }, [cuAmount, isExpired, lastL1Block, stake, workerEpochLength]);

  return (
    <>
      <Box minHeight={256} mb={2} display="flex">
        <SummarySection
          loading={isLoading}
          sx={{ width: 1 }}
          title={<SquaredChip label="Lock Info" color="primary" />}
          action={
            <Stack direction="row" spacing={1}>
              <GatewayStakeButton sources={sources} disabled={isLoading || isPending} />
              <GatewayUnstakeButton disabled={isLoading || !isExpired} />
            </Stack>
          }
        >
          <Stack direction="column" flex={1}>
            <Box alignSelf="end">
              <AutoExtension value={stake?.autoExtension} disabled={isLoading || !stake?.amount} />
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
                  <ColumnLabel>
                    <Stack direction="row" spacing={1}>
                      <span>Amount</span>
                      <Tooltip
                        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                        placement="top"
                      >
                        <Box display="flex">
                          {stake &&
                            lastL1Block &&
                            (isPending ? (
                              <SquaredChip label="Pending" color="warning" />
                            ) : isActive ? (
                              <SquaredChip label="Active" color="info" />
                            ) : isExpired ? (
                              <SquaredChip label="Expired" color="error" />
                            ) : null)}
                        </Box>
                      </Tooltip>
                    </Stack>
                  </ColumnLabel>
                  <ColumnValue>{tokenFormatter(fromSqd(stake?.amount), SQD_TOKEN, 3)}</ColumnValue>
                </Box>
                <Box>
                  <ColumnLabel>
                    <HelpTooltip title="In the current epoch">
                      <span>Available CUs</span>
                    </HelpTooltip>
                  </ColumnLabel>
                  <ColumnValue>{numberWithCommasFormatter(cuPerEpoch || 0)}</ColumnValue>
                </Box>
              </Stack>
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <Box>
                  <ColumnLabel>Unlocked At</ColumnLabel>
                  <ColumnValue>
                    {!stake?.autoExtension
                      ? unlockDate && stake?.lockEnd
                        ? dateFormat(unlockDate, narrowXs ? 'date' : 'dateTime')
                        : '-'
                      : 'Auto-extension enabled'}
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
  const account = useAccount();
  const squid = useSquid();

  const { data: sources, isLoading: isSourcesLoading } = useMySources();

  const { data: gatewaysQuery, isLoading: isGatewaysQueryLoading } = useMyGatewaysQuery(squid, {
    address: account?.address || '0x',
  });

  const isLoading = isSourcesLoading || isGatewaysQueryLoading;

  return (
    <DashboardTable
      loading={isLoading}
      title={
        <>
          <SquaredChip label="My Portals" color="primary" />

          <Stack direction="row" spacing={1}>
            <Button color="secondary" variant="outlined">
              LEARN MORE
            </Button>
            <AddGatewayButton disabled={isLoading} sources={sources} />
          </Stack>
        </>
      }
    >
      <TableHead>
        <TableRow>
          <TableCell>Portal</TableCell>
          <TableCell>Registered</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {gatewaysQuery?.gateways.length ? (
          <>
            {gatewaysQuery?.gateways.map(gateway => {
              return (
                <TableRow key={gateway.id}>
                  <TableCell>
                    <GatewayName gateway={gateway} to={`/portals/${gateway.id}`} />
                  </TableCell>
                  <TableCell>{dateFormat(gateway.createdAt)}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-end">
                      <GatewayUnregisterButton gateway={gateway} />
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        ) : (
          <NoItems>
            <Typography>No portal registered yet</Typography>
            {/* {!isProMode && (
              <AddGateway
                sx={{ mt: 2 }}
                disabled={!isProMode && BigInt(stake?.stake?.amount || 0) <= 0n}
              />
            )} */}
          </NoItems>
        )}
      </TableBody>
    </DashboardTable>
  );
}

const GettingStartedAlert = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const steps = [
    {
      primary: 'Get SQD tokens',
      secondary: (
        <>
          Make sure you have enough SQD tokens. <a href="#">How much do I need?</a>
        </>
      ),
    },
    {
      primary: 'Lock you tokens',
      secondary: (
        <>
          Lock your tokens to obtain Compute Units (CUs). <a href="#">How do I lock my tokens?</a>
        </>
      ),
    },
    {
      primary: 'Generate a Peer ID',
      secondary: (
        <>
          Create a Peer ID to identify your portal. <a href="#">How do I generate a Peer ID?</a>
        </>
      ),
    },
    {
      primary: 'Add your portal',
      secondary: <>Register your portal on a chain.</>,
    },
  ];

  return (
    <Alert
      sx={{ mb: 2 }}
      color="info"
      icon={<Info />}
      action={
        <IconButton color="inherit" sx={{ padding: 0.5 }} onClick={() => setOpen(!open)}>
          <ExpandMore
            sx={{
              transition: 'transform 300ms ease-out',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </IconButton>
      }
    >
      <Typography>Getting started with your portal</Typography>

      <Collapse in={open} unmountOnExit timeout={300}>
        <Box pt={1.5}>
          <List disablePadding>
            {steps.map(({ primary, secondary }, i) => (
              <ListItem
                key={i}
                sx={{ listStyle: 'list-item' }}
                disablePadding
                alignItems="flex-start"
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: '16px',
                      backgroundColor: theme.palette.info.main,
                    }}
                  >
                    {i + 1}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1" mt={1}>
            That's it! You're ready to run your Portal. If you need more guidance read our{' '}
            <a href="#">portal section</a> in our docs or reach out to our{' '}
            <a href="#">support team</a> for help.
          </Typography>
        </Box>
      </Collapse>
    </Alert>
  );
};

export function GatewaysPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <GettingStartedAlert />
        <MyStakes />
        <MyGateways />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
