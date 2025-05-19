import { dateFormat } from '@i18n';
import { addressFormatter, percentFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, unwrapMulticallResult } from '@lib/network/utils';
import { Divider, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { keepPreviousData } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';
import { useReadContracts } from 'wagmi';

import { sqdAbi, vestingAbi } from '@api/contracts';
import { useVestingByAddress, createDefaultVesting } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { SquaredChip } from '@components/Chip';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { NotFound } from '@components/NotFound';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

import { ReleaseButton } from './ReleaseButton';

export const DescLabel = styled(Box, {
  name: 'DescLabel',
})(({ theme }) => ({
  flex: 0.5,
  color: theme.palette.text.secondary,
  whiteSpace: 'balance',
  maxWidth: theme.spacing(25),
}));

export const DescValue = styled(Box, {
  name: 'DescValue',
})(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
  overflowWrap: 'anywhere',
}));

export const VestingAddress = styled(Box, {
  name: 'VestingAddress',
})(({}) => ({
  overflowWrap: 'anywhere',
}));

export const Title = styled(SquaredChip)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export function Vesting({ backPath }: { backPath: string }) {
  const { SQD_TOKEN, SQD } = useContracts();

  const { address } = useParams<{ address: `0x${string}` }>();

  const vestingContract = { abi: vestingAbi, address } as const;
  const { data: vestingInfo, isLoading: isVestingInfoLoading } = useReadContracts({
    contracts: [
      {
        ...vestingContract,
        functionName: 'start',
      },
      {
        ...vestingContract,
        functionName: 'end',
      },
      {
        ...vestingContract,
        functionName: 'depositedIntoProtocol',
      },
      {
        ...vestingContract,
        functionName: 'releasable',
        args: [SQD],
      },
      {
        ...vestingContract,
        functionName: 'released',
        args: [SQD],
      },
      {
        abi: sqdAbi,
        address: SQD,
        functionName: 'balanceOf',
        args: [address || '0x'],
      },
      {
        ...vestingContract,
        functionName: 'immediateReleaseBIP',
      },
      {
        ...vestingContract,
        functionName: 'expectedTotalAmount',
      },
    ] as const,
    query: {
      placeholderData: keepPreviousData,
      select: res => {
        if (res?.some(r => r.status === 'success')) {
          return {
            start: Number(unwrapMulticallResult(res[0])) * 1000,
            end: Number(unwrapMulticallResult(res[1])) * 1000,
            deposited: unwrapMulticallResult(res[2]),
            releasable: unwrapMulticallResult(res[3]),
            released: unwrapMulticallResult(res[4]),
            balance: unwrapMulticallResult(res[5]),
            initialRelease: Number(unwrapMulticallResult(res[6]) || 0) / 100,
            expectedTotal: unwrapMulticallResult(res[7]),
          };
        }

        return undefined;
      },
    },
  });
  const { data: vesting, isPending: isVestingLoading } = useVestingByAddress({ address });

  const [searchParams] = useSearchParams();

  const isLoading = isVestingLoading || isVestingInfoLoading;
  const displayVesting = isLoading ? createDefaultVesting() : vesting;
  const displayVestingInfo = isLoading ? createDefaultVesting() : vestingInfo;

  if (!displayVesting || !address) {
    return <NotFound item="vesting" id={address} />;
  }

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={
          <Stack>
            <ReleaseButton
              vesting={displayVesting}
              disabled={isLoading || !displayVesting?.isOwn() || !displayVestingInfo?.releasable}
            />
          </Stack>
        }
      />
      <Card outlined>
        <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
          <Box>
            <Title label="Info" />
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Contract</DescLabel>
                <DescValue>
                  <VestingAddress>
                    <SkeletonWrapper loading={isLoading}>
                      <CopyToClipboard text={address} content={addressFormatter(address)} />
                    </SkeletonWrapper>
                  </VestingAddress>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Balance</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(displayVestingInfo?.balance), SQD_TOKEN, 8)}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Deposited</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(displayVestingInfo?.deposited), SQD_TOKEN, 8)}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Releasable</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(displayVestingInfo?.releasable), SQD_TOKEN, 8)}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Released</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(displayVestingInfo?.released), SQD_TOKEN, 8)}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Title label="Lock Period" />
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Start</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {displayVestingInfo?.start
                        ? dateFormat(displayVestingInfo?.start, 'dateTime')
                        : '-'}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>End</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {displayVestingInfo?.end
                        ? dateFormat(displayVestingInfo?.end, 'dateTime')
                        : '-'}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Initial release</DescLabel>
                <DescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {`${tokenFormatter(
                        fromSqd(displayVestingInfo?.expectedTotal)
                          .times(displayVestingInfo?.initialRelease ?? 0)
                          .div(100),
                        SQD_TOKEN,
                        8,
                      )} (${percentFormatter(displayVestingInfo?.initialRelease)})`}
                    </span>
                  </SkeletonWrapper>
                </DescValue>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </CenteredPageWrapper>
  );
}
