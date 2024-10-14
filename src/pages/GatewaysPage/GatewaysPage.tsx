import React, { useMemo } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network';
import {
  Box,
  Button,
  Divider,
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

import {
  useReadGatewayRegistryComputationUnitsAmount,
  useReadGatewayRegistryGetStake,
  useReadNetworkControllerWorkerEpochLength,
  useReadRouterNetworkController,
} from '@api/contracts';
import { useMyGateways, useMyGatewayStake } from '@api/subsquid-network-squid/gateways-graphql';
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
  const { GATEWAY_REGISTRATION, ROUTER, SQD_TOKEN } = useContracts();

  const { data: stake, isLoading: isStakeLoading } = useReadGatewayRegistryGetStake({
    address: GATEWAY_REGISTRATION,
    args: [address || '0x'],
  });
  const { data: cuAmount, isLoading: isCuAmountLoading } =
    useReadGatewayRegistryComputationUnitsAmount({
      address: GATEWAY_REGISTRATION,
      args: [stake?.amount || 0n, stake?.duration || 0n],
    });
  const { data: lastBlockInfo, isLoading: isLastBlockInfoLoading } = useMyGatewayStake();
  const { data: workerEpochLength, isLoading: isWorkerEpochLengthLoading } =
    useReadNetworkControllerWorkerEpochLength({
      address: useReadRouterNetworkController({ address: ROUTER }).data,
    });

  const isLoading =
    isStakeLoading || isCuAmountLoading || isLastBlockInfoLoading || isWorkerEpochLengthLoading;

  const unlockDate = useMemo(() => {
    if (!stake || !lastBlockInfo) return;

    return (
      (Number(stake.lockEnd) - lastBlockInfo.lastBlockL1 + 1) * 12_000 +
      new Date(lastBlockInfo.lastBlockTimestampL1).getTime()
    );
  }, [lastBlockInfo, stake]);

  const cuPerEpoch = useMemo(() => {
    if (!stake || !workerEpochLength || !lastBlockInfo) return 0;

    if (stake.lockEnd < lastBlockInfo.lastBlockL1) return 0;

    const computationUnits =
      stake.lockStart > lastBlockInfo.lastBlockL1 ? stake.oldCUs : cuAmount || 0n;
    if (stake.duration < workerEpochLength) return computationUnits;

    return (computationUnits * workerEpochLength) / stake.duration;
  }, [cuAmount, lastBlockInfo, stake, workerEpochLength]);

  return (
    <>
      <Box minHeight={256} mb={2} display="flex">
        <SummarySection
          loading={isLoading}
          sx={{ width: 1 }}
          title={<SquaredChip label="Lock Info" color="primary" />}
          action={
            <Stack direction="row" spacing={1}>
              <GatewayStakeButton
                stake={stake}
                disabled={stake && stake.lockStart > (lastBlockInfo?.lastBlockL1 || 0n)}
              />
              <GatewayUnstakeButton
                disabled={!stake || stake.lockEnd > (lastBlockInfo?.lastBlockL1 || 0n)}
              />
            </Stack>
          }
        >
          <Stack direction="column" flex={1}>
            <Box alignSelf="end">
              <AutoExtension value={stake?.autoExtension} disabled={!stake} />
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
                            lastBlockInfo &&
                            (stake.lockStart > lastBlockInfo.lastBlockL1 ? (
                              <SquaredChip label="Pending" color="warning" />
                            ) : stake.lockEnd > lastBlockInfo.lastBlockL1 ? (
                              <SquaredChip label="Active" color="info" />
                            ) : (
                              <SquaredChip label="Expired" color="error" />
                            ))}
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
                  <ColumnValue>
                    {numberWithCommasFormatter(cuPerEpoch || 0)}
                    {/* {stake?.stake?.computationUnitsPending
                      ? ` (${numberWithCommasFormatter(stake?.stake?.computationUnitsPending)})`
                      : ``} */}
                  </ColumnValue>
                </Box>
              </Stack>
              <Stack divider={<Divider flexItem />} spacing={1} flex={1}>
                <Box>
                  <ColumnLabel>Unlocked At</ColumnLabel>
                  <ColumnValue>
                    {!stake?.autoExtension
                      ? unlockDate && !stake?.autoExtension
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
  const { data: gateways, isLoading: isGatewaysLoading } = useMyGateways();
  // const [isProMode, setProMode] = useLocalStorageState<boolean>('sqd_portals_pro_mode', {
  //   defaultValue: false,
  //   serializer: localStorageBoolSerializer,
  //   storageSync: false,
  // });

  return (
    <DashboardTable
      loading={isGatewaysLoading}
      title={
        <>
          <Stack direction="row" spacing={1.5}>
            <SquaredChip label="My Portals" color="primary" />
            {/* <Box pl={0.5} pr={0.5}>
              <FormGroup>
                <FormControlLabel
                  checked={isProMode}
                  control={<Switch size="small" onChange={() => setProMode(!isProMode)} />}
                  label={<Typography variant="body2">Pro mode</Typography>}
                  labelPlacement="end"
                />
              </FormGroup>
            </Box> */}
          </Stack>
          <Stack direction="row" spacing={1}>
            <AddGatewayButton />
            <Button color="secondary" variant="outlined">
              LEARN MORE
            </Button>
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
