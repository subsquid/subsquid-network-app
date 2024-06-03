import { dateFormat } from '@i18n';
import { addressFormatter, percentFormatter } from '@lib/formatters/formatters';
import { Divider, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useVestingContract } from '@api/contracts/vesting';
import { useVestingByAddress } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { Loader } from '@components/Loader';
import { NotFound } from '@components/NotFound';
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
})(({}) => ({
  overflowWrap: 'anywhere',
}));

export function Vesting({ backPath }: { backPath: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const { address } = useParams<{ address: `0x${string}` }>();
  const { data: vestingInfo, isLoading: isVestingInfoLoading } = useVestingContract({ address });
  const { data: vesting, isPending: isVestingLoading } = useVestingByAddress({ address });
  const { SQD_TOKEN } = useContracts();

  const [searchParams] = useSearchParams();

  const isLoading = isVestingLoading || isVestingInfoLoading;

  if (isLoading) return <Loader />;
  else if (!vesting || !address) {
    return <NotFound item="vesting" id={address} />;
  }

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={vesting?.isOwn() ? <ReleaseButton vesting={vesting} /> : null}
      />
      <Card>
        <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
          <Box>
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Contract</DescLabel>
                <DescValue>
                  <VestingAddress>
                    <CopyToClipboard text={address} content={addressFormatter(address, isMobile)} />
                  </VestingAddress>
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Balance</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, vestingInfo?.balance, 8)}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Deposited</DescLabel>
                <DescValue>
                  {vestingInfo?.deposited ? formatSqd(SQD_TOKEN, vestingInfo?.deposited, 8) : '-'}
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Releasable</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, vestingInfo?.releasable, 8)}</DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Released</DescLabel>
                <DescValue>{formatSqd(SQD_TOKEN, vestingInfo?.released, 8)}</DescValue>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <DescLabel>Start</DescLabel>
                <DescValue>
                  {vestingInfo?.start ? dateFormat(vestingInfo?.start, 'dateTime') : '-'}
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>End</DescLabel>
                <DescValue>
                  {vestingInfo?.end ? dateFormat(vestingInfo?.end, 'dateTime') : '-'}
                </DescValue>
              </Stack>
              <Stack direction="row">
                <DescLabel>Initial release</DescLabel>
                <DescValue>{`${formatSqd(
                  SQD_TOKEN,
                  fromSqd(vestingInfo?.expectedTotal)
                    .mul(vestingInfo?.initialRelease ?? 0)
                    .div(100),
                  8,
                )} (${percentFormatter(vestingInfo?.initialRelease)})`}</DescValue>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Card>
    </CenteredPageWrapper>
  );
}
