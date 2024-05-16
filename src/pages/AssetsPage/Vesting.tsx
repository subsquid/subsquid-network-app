import React from 'react';

import { addressFormatter, percentFormatter } from '@lib/formatters/formatters';
import { Divider, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useVesting } from '@api/contracts/vesting';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { Loader } from '@components/Loader';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { useContracts } from '@network/useContracts';

import { ReleaseButton } from './ReleaseButton';

export const DescLabel = styled(Box, {
  name: 'DescLabel',
})(({ theme }) => ({
  flex: 0.5,
  color: theme.palette.text.secondary,
  whiteSpace: 'balance',
  maxWidth: theme.spacing(25),
  fontSize: '1rem',
}));

export const DescValue = styled(Box, {
  name: 'DescValue',
})(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
  overflowWrap: 'anywhere',
}));

export const Title = styled(Box)(({ theme }) => ({
  fontSize: '1.25rem',
  lineHeight: 1,
  marginBottom: theme.spacing(3),
}));

export const VestingAddress = styled(Box, {
  name: 'VestingAddress',
})(({ theme }) => ({
  color: theme.palette.importantLink.main,
  overflowWrap: 'anywhere',
}));

export function Vesting({ backPath }: { backPath: string }) {
  const { address } = useParams<{ address: `0x${string}` }>();
  const { data, isLoading } = useVesting({ address });
  const { SQD_TOKEN } = useContracts();

  const [searchParams] = useSearchParams();

  if (isLoading) return <Loader />;
  else if (!data || !address) {
    return <Box>Not found</Box>;
  }

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={
          <Stack direction="row" spacing={2}>
            <ReleaseButton vesting={{ address }} />
          </Stack>
        }
      />
      <Card>
        <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
          <Box>
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Contract</DescLabel>
                <DescValue>
                  <VestingAddress>
                    <CopyToClipboard text={address} content={addressFormatter(address)} />
                  </VestingAddress>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Balance</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, data.balance, 8)}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Deposited</DescLabel>
                <DescValue>
                  {data.deposited ? formatSqd(SQD_TOKEN, data.deposited, 8) : '-'}
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Releasable</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, data.releasable, 8)}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Released</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, data.released, 8)}</DescValue>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Start</DescLabel>
                <DescValue>{data.start || '-'}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>End</DescLabel>
                <DescValue>{data.end || '-'}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Initial release</DescLabel>
                <DescValue>{`${formatSqd(SQD_TOKEN, fromSqd(data.expectedTotal).mul(data.initialRelease / 100), 8)} (${percentFormatter(data.initialRelease)})`}</DescValue>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </CenteredPageWrapper>
  );
}
