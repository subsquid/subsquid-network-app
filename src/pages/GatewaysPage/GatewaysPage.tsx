import { useMemo, useState } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, getBlockTime } from '@lib/network';
import { ExpandMore, Info } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
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
import { Link, Outlet } from 'react-router-dom';
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
import { SquaredChip } from '@components/Chip';
import { HelpTooltip } from '@components/HelpTooltip';
import { DashboardTable, NoItems } from '@components/Table';
import { useCountdown } from '@hooks/useCountdown';
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

function AppliesTooltip({ timestamp }: { timestamp?: string }) {
  const timeLeft = useCountdown({ timestamp });

  return <span>{`Applies in ${timeLeft} (${dateFormat(timestamp, 'dateTime')})`}</span>;
}

function ExpiresTooltip({ timestamp }: { timestamp?: string }) {
  const timeLeft = useCountdown({ timestamp });

  return <span>{`Expires in ${timeLeft} (${dateFormat(timestamp, 'dateTime')})`}</span>;
}

export function MyStakes() {
  const theme = useTheme();
  const narrowXs = useMediaQuery(theme.breakpoints.down('xs'));

  const { address } = useAccount();

  const { GATEWAY_REGISTRATION, ROUTER, SQD_TOKEN, CHAIN_ID_L1: l1ChainId } = useContracts();

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
  });
  const { data: appliedAtL1Block, isLoading: isAppliedAtBlockLoading } = useBlock({
    chainId: l1ChainId,
    blockNumber: stake?.lockStart,
    includeTransactions: false,
    query: {
      enabled: stake && stake?.lockStart <= (lastL1Block?.number || 0n),
    },
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

  const appliedAt = useMemo(() => {
    if (!stake || !lastL1Block) return;

    if (stake.lockStart < lastL1Block.number)
      return new Date(Number(appliedAtL1Block?.timestamp || 0n) * 1000).toISOString();

    return new Date(
      Number(lastL1Block.timestamp) * 1000 +
        getBlockTime(stake.lockStart - lastL1Block.number + 1n),
    ).toISOString();
  }, [appliedAtL1Block?.timestamp, lastL1Block, stake]);

  const unlockedAt = useMemo(() => {
    if (!stake || !lastL1Block || stake.autoExtension) return;

    if (stake.lockEnd < lastL1Block.number)
      return new Date(Number(unlockedAtL1Block?.timestamp || 0n) * 1000).toISOString();

    return new Date(
      Number(lastL1Block.timestamp) * 1000 + getBlockTime(stake.lockEnd - lastL1Block.number + 1n),
    ).toISOString();
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
              <GatewayUnstakeButton
                disabled={isLoading || !stake?.amount}
                source={{
                  locked: !isExpired,
                  unlockedAt,
                }}
              />
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
                      <Box display="flex">
                        {stake &&
                          lastL1Block &&
                          (isPending ? (
                            <Tooltip
                              title={<AppliesTooltip timestamp={appliedAt} />}
                              placement="top"
                            >
                              <SquaredChip label="Pending" color="warning" />
                            </Tooltip>
                          ) : isActive ? (
                            <Tooltip
                              title={<ExpiresTooltip timestamp={unlockedAt} />}
                              placement="top"
                            >
                              <SquaredChip label="Active" color="info" />
                            </Tooltip>
                          ) : isExpired ? (
                            <SquaredChip label="Expired" color="error" />
                          ) : null)}
                      </Box>
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
              {/* <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <Box>
                  <ColumnLabel>Expired At</ColumnLabel>
                  <ColumnValue>
                    {!stake?.autoExtension
                      ? unlockDate && stake?.lockEnd
                        ? dateFormat(unlockDate, narrowXs ? 'date' : 'dateTime')
                        : '-'
                      : 'Auto-extension enabled'}
                  </ColumnValue>
                </Box>
              </Stack> */}
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

  const { data: gatewaysQuery, isLoading: isGatewaysQueryLoading } = useMyGatewaysQuery({
    address: account?.address || '0x',
  });

  const isLoading = isSourcesLoading || isGatewaysQueryLoading;

  return (
    <DashboardTable
      loading={isLoading}
      title={
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
          <SquaredChip label="My Portals" color="primary" />
          <Stack direction="row" spacing={1}>
            <Button
              color="secondary"
              variant="outlined"
              component={Link}
              target="_blank"
              to="https://docs.sqd.dev/subsquid-network/participate/portal/"
            >
              LEARN MORE
            </Button>
            <AddGatewayButton disabled={isLoading} sources={sources} />
          </Stack>
        </Box>
      }
      sx={{ mb: 2 }}
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
          gatewaysQuery.gateways.map(gateway => (
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
          ))
        ) : isLoading ? null : (
          <NoItems>
            <Typography>No portal registered yet</Typography>
          </NoItems>
        )}
      </TableBody>
    </DashboardTable>
  );
}

const GettingStarted = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const steps = [
    {
      primary: 'Get SQD tokens',
      secondary: (
        <>
          Make sure you have enough SQD tokens to get started.{' '}
          <a
            href="https://docs.sqd.dev/subsquid-network/participate/portal/#staking-requirements-and-compute-units"
            target="_blank"
            rel="noreferrer"
          >
            How much do I need?
          </a>
        </>
      ),
    },
    {
      primary: 'Lock your tokens',
      secondary: (
        <>
          Lock your SQD tokens to generate Compute Units (CUs), which are used to handle SQD Network
          queries.{' '}
          <a
            href="https://docs.sqd.dev/subsquid-network/participate/portal/#staking-requirements-and-compute-units"
            target="_blank"
            rel="noreferrer"
          >
            How do CUs transfer to SQD?
          </a>
        </>
      ),
    },
    {
      primary: 'Generate a Peer ID',
      secondary: (
        <>
          Create a Peer ID to identify your portal.{' '}
          <a
            href="https://docs.sqd.dev/subsquid-network/participate/portal/#generate-peer-id"
            target="_blank"
            rel="noreferrer"
          >
            How to generate a Peer ID?
          </a>
        </>
      ),
    },
    {
      primary: 'Register Your Portal',
      secondary: <>Add your portal to the chain to complete the setup.</>,
    },
  ];

  return (
    <Card sx={{ mb: 2, background: '#f3f3ff', padding: 0 }}>
      <Alert
        sx={{ cursor: 'pointer' }}
        color="info"
        icon={<Info />}
        action={
          <IconButton color="inherit" sx={{ padding: 0.5 }}>
            <ExpandMore
              sx={{
                transition: 'transform 300ms ease-out',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </IconButton>
        }
        onClick={() => setOpen(!open)}
      >
        <Typography>Getting started with your portal</Typography>
      </Alert>

      <Collapse in={open} timeout={300}>
        <Box pt={0} pl={6.5} pr={6.5} pb={2} color="#383766">
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
            That's it! Your portal is now ready to run. For more detailed guidance, check out the{' '}
            <a
              href="https://docs.sqd.dev/subsquid-network/participate/portal/"
              target="_blank"
              rel="noreferrer"
            >
              Portal Documentation
            </a>{' '}
            or{' '}
            <a href="https://t.me/HydraDevs" target="_blank" rel="noreferrer">
              contact our team
            </a>{' '}
            for help.
          </Typography>
        </Box>
      </Collapse>
    </Card>
  );
};

export function GatewaysPage() {
  return (
    <CenteredPageWrapper className="wide">
      <ConnectedWalletRequired>
        <GettingStarted />
        <MyStakes />
        <MyGateways />
      </ConnectedWalletRequired>
      <Outlet />
    </CenteredPageWrapper>
  );
}
