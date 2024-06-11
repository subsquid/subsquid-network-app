import { dateFormat } from '@i18n';
import {
  bytesFormatter,
  numberWithSpacesFormatter,
  percentFormatter,
  tokenFormatter,
  urlFormatter,
} from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Divider, Stack, styled } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import { useWorkerByPeerId, WorkerStatus } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { CopyToClipboard } from '@components/CopyToClipboard';
import { Loader } from '@components/Loader';
import { NotFound } from '@components/NotFound';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerUnregister } from '@pages/WorkersPage/WorkerUnregister';

import { DelegationCapacity } from './DelegationCapacity';
import { UptimeGraph } from './UptimeGraph';
import { WorkerCard } from './WorkerCard';
import { WorkerDelegate } from './WorkerDelegate';
import { WorkerUndelegate } from './WorkerUndelegate';
import { WorkerVersion } from './WorkerVersion';

// const sx = {
//   background: '#000',
//   color: '#fff',

//   '&:hover': {
//     background: '#333',
//     color: '#fff',
//   },
// };

export const WorkerDescLabel = styled(Box, {
  name: 'WorkerDescLabel',
})(({ theme }) => ({
  flex: 0.5,
  color: theme.palette.text.secondary,
  whiteSpace: 'balance',
  maxWidth: theme.spacing(25),
  fontSize: '1rem',
}));

export const WorkerColumn = styled(Box, {
  name: 'WorkerDescLabel',
})(() => ({
  flex: 1,
}));

export const WorkerDescTable = styled(Box, {
  name: 'WorkerDescTable',
})(() => ({
  flex: 1,
}));

export const WorkerDescRow = styled(Box, {
  name: 'WorkerDescRow',
})(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  margin: theme.spacing(5, 0),
  lineHeight: 1.4,
}));

export const WorkerDescValue = styled(Box, {
  name: 'WorkerDescValue',
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

export const Worker = ({ backPath }: { backPath: string }) => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: worker, isPending } = useWorkerByPeerId(peerId);
  const { address } = useAccount();
  const { SQD_TOKEN } = useContracts();

  const [searchParams] = useSearchParams();

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={
          <Stack direction="row" spacing={2}>
            <WorkerDelegate worker={worker} />
            <WorkerUndelegate worker={worker} />
          </Stack>
        }
      />

      {isPending ? (
        <Loader />
      ) : !worker ? (
        <NotFound item="worker" id={peerId} />
      ) : (
        <>
          <Card>
            <WorkerCard
              worker={worker}
              canEdit={
                worker.realOwner.id === address &&
                [WorkerStatus.Active, WorkerStatus.Registering].includes(worker.status)
              }
            />
            <Box sx={{ mt: 4 }}>
              <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
                <Box>
                  <Stack spacing={2} direction="column">
                    <Stack direction="row">
                      <WorkerDescLabel>Registered</WorkerDescLabel>
                      <WorkerDescValue>{dateFormat(worker.createdAt, 'dateTime')}</WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Version</WorkerDescLabel>
                      <WorkerDescValue>
                        <WorkerVersion worker={worker} />
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Website</WorkerDescLabel>
                      <WorkerDescValue>
                        {worker.website ? (
                          <a href={urlFormatter(worker.website)} target="_blank" rel="noreferrer">
                            {urlFormatter(worker.website)}
                          </a>
                        ) : (
                          '-'
                        )}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Contact</WorkerDescLabel>
                      <WorkerDescValue>
                        {worker.email ? <CopyToClipboard text={worker.email} /> : '-'}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Description</WorkerDescLabel>
                      <WorkerDescValue>{worker.description || '-'}</WorkerDescValue>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
              <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
                <Box>
                  <Title>Bond</Title>
                  <Stack spacing={2}>
                    <Stack direction="row">
                      <WorkerDescLabel>Bonded</WorkerDescLabel>
                      <WorkerDescValue>
                        {tokenFormatter(fromSqd(worker.bond), SQD_TOKEN)}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Worker APR</WorkerDescLabel>
                      <WorkerDescValue>
                        {worker.apr != null ? percentFormatter(worker.apr) : '-'}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Total reward</WorkerDescLabel>
                      <WorkerDescValue>
                        {tokenFormatter(
                          fromSqd(worker.claimableReward).plus(fromSqd(worker.claimedReward)),
                          SQD_TOKEN,
                        )}
                      </WorkerDescValue>
                    </Stack>
                  </Stack>
                </Box>

                <Box>
                  <Title>Delegation</Title>
                  <Stack spacing={2}>
                    <Stack direction="row">
                      <WorkerDescLabel>Delegators</WorkerDescLabel>
                      <WorkerDescValue>{worker.delegationCount}</WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Total delegation</WorkerDescLabel>
                      <WorkerDescValue>
                        {tokenFormatter(fromSqd(worker.totalDelegation), SQD_TOKEN)}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Delegation capacity</WorkerDescLabel>
                      <WorkerDescValue>
                        <DelegationCapacity worker={worker} />
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Delegator APR</WorkerDescLabel>
                      <WorkerDescValue>
                        {worker.stakerApr != null ? percentFormatter(worker.stakerApr) : '-'}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Total reward</WorkerDescLabel>
                      <WorkerDescValue>
                        {tokenFormatter(fromSqd(worker.totalDelegationRewards), SQD_TOKEN)}
                      </WorkerDescValue>
                    </Stack>
                  </Stack>
                </Box>

                <Box>
                  <Title>Statistics</Title>
                  <Stack spacing={2}>
                    <Stack direction="row">
                      <WorkerDescLabel>Uptime, 24h / 90d</WorkerDescLabel>
                      <WorkerDescValue>
                        {percentFormatter(worker.uptime24Hours)} /{' '}
                        {percentFormatter(worker.uptime90Days)}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Queries, 24h / 90d</WorkerDescLabel>
                      <WorkerDescValue>
                        {numberWithSpacesFormatter(worker.queries24Hours)} /{' '}
                        {numberWithSpacesFormatter(worker.queries90Days)}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Data served, 24h / 90d</WorkerDescLabel>
                      <WorkerDescValue>
                        {bytesFormatter(worker.servedData24Hours)} /{' '}
                        {bytesFormatter(worker.servedData90Days)}
                      </WorkerDescValue>
                    </Stack>
                    <Stack direction="row">
                      <WorkerDescLabel>Data stored</WorkerDescLabel>
                      <WorkerDescValue>{bytesFormatter(worker.storedData)}</WorkerDescValue>
                    </Stack>
                  </Stack>

                  <UptimeGraph worker={worker} />
                </Box>
              </Stack>
            </Box>
          </Card>
          {worker.realOwner.id === address && worker.status !== WorkerStatus.Withdrawn ? (
            <Box mt={2.5}>
              <WorkerUnregister worker={worker} />
            </Box>
          ) : null}
        </>
      )}
    </CenteredPageWrapper>
  );
};
