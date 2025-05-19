import { dateFormat } from '@i18n';
import {
  bytesFormatter,
  numberWithCommasFormatter,
  percentFormatter,
  tokenFormatter,
  urlFormatter,
} from '@lib/formatters/formatters.ts';
import { fromSqd } from '@lib/network';
import { Box, Divider, Stack, styled } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  useWorkerByPeerId,
  WorkerStatus as ApiWorkerStatus,
  WorkerStatus,
  useMySources,
  useMyWorkerDelegations,
  AccountType,
  createDefaultWorker,
} from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { SquaredChip } from '@components/Chip';
import { NotFound } from '@components/NotFound';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerUnregisterButton } from '@pages/WorkersPage/WorkerUnregister';
import { SkeletonWrapper } from '@components/SkeletonWrapper';

import { DelegationCapacity } from './DelegationCapacity';
import { WorkerCard } from './WorkerCard';
import { WorkerDelegate } from './WorkerDelegate';
import { WorkerUndelegate } from './WorkerUndelegate';
import { WorkerVersion } from './WorkerVersion';
import { WorkerWithdrawButton } from './WorkerWithdraw';

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

export const Title = styled(SquaredChip)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const Worker = ({ backPath }: { backPath: string }) => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: worker, isLoading: isPending } = useWorkerByPeerId(peerId);
  const { address } = useAccount();
  const { SQD_TOKEN } = useContracts();

  const [searchParams] = useSearchParams();

  const { data: sources, isLoading: isSourcesLoading } = useMySources();
  const { data: delegations, isLoading: isDelegationsLoading } = useMyWorkerDelegations({ peerId });

  const isLoading = isPending || isSourcesLoading || isDelegationsLoading;
  const displayWorker = isLoading ? createDefaultWorker() : worker;

  if (!displayWorker) {
    return <NotFound item="worker" id={peerId} />;
  }

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={
          <Stack direction="row" spacing={2}>
            <WorkerDelegate
              worker={displayWorker}
              variant="outlined"
              sources={sources}
              disabled={isLoading}
            />
            <WorkerUndelegate
              worker={displayWorker}
              sources={delegations?.map(d => ({
                id: d.owner.id,
                type: d.owner.type,
                balance: d.deposit,
                locked: d.locked || false,
                lockEnd: d.lockEnd,
              }))}
              disabled={isLoading}
            />
          </Stack>
        }
      />

      <Card outlined>
        <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
          <WorkerCard
            loading={isLoading}
            worker={displayWorker}
            owner={displayWorker.owner}
            canEdit={
              !isLoading &&
              displayWorker.realOwner.id === address &&
              [ApiWorkerStatus.Active, ApiWorkerStatus.Registering].includes(displayWorker.status)
            }
          />
          <Box>
            <Title label="Info" />
            <Stack spacing={2} direction="column">
              <Stack direction="row">
                <WorkerDescLabel>Created</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{dateFormat(displayWorker.createdAt, 'dateTime')}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Version</WorkerDescLabel>
                <WorkerDescValue>
                  <WorkerVersion loading={isLoading} version={displayWorker.version} />
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Website</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading} width={160}>
                    {displayWorker.website ? (
                      <a
                        href={urlFormatter(displayWorker.website)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {urlFormatter(displayWorker.website)}
                      </a>
                    ) : (
                      <span>-</span>
                    )}
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Description</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading} width={160}>
                    <span>{displayWorker.description || '-'}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Title label="Bond" />
            <Stack spacing={2}>
              <Stack direction="row">
                <WorkerDescLabel>Bonded</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{tokenFormatter(fromSqd(displayWorker.bond), SQD_TOKEN)}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Worker APR</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {displayWorker.apr != null ? percentFormatter(displayWorker.apr) : '-'}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Total reward</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(
                        fromSqd(displayWorker.claimableReward).plus(
                          fromSqd(displayWorker.claimedReward),
                        ),
                        SQD_TOKEN,
                      )}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Title label="Delegation" />
            <Stack spacing={2}>
              <Stack direction="row">
                <WorkerDescLabel>Delegators</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{displayWorker.delegationCount}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Total delegation</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{tokenFormatter(fromSqd(displayWorker.totalDelegation), SQD_TOKEN)}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Delegation capacity</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <DelegationCapacity worker={displayWorker} />
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Delegator APR</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {displayWorker.stakerApr != null
                        ? percentFormatter(displayWorker.stakerApr)
                        : '-'}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Total reward</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {tokenFormatter(fromSqd(displayWorker.totalDelegationRewards), SQD_TOKEN)}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
            </Stack>
          </Box>

          <Box>
            <Title label="Statistics" />
            <Stack spacing={2}>
              <Stack direction="row">
                <WorkerDescLabel>Uptime, 24h / 90d</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {percentFormatter(displayWorker.uptime24Hours)} /{' '}
                      {percentFormatter(displayWorker.uptime90Days)}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Queries, 24h / 90d</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {numberWithCommasFormatter(displayWorker.queries24Hours)} /{' '}
                      {numberWithCommasFormatter(displayWorker.queries90Days)}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Data served, 24h / 90d</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>
                      {bytesFormatter(displayWorker.servedData24Hours)} /{' '}
                      {bytesFormatter(displayWorker.servedData90Days)}
                    </span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
              <Stack direction="row">
                <WorkerDescLabel>Data stored</WorkerDescLabel>
                <WorkerDescValue>
                  <SkeletonWrapper loading={isLoading}>
                    <span>{bytesFormatter(displayWorker.storedData)}</span>
                  </SkeletonWrapper>
                </WorkerDescValue>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Card>

      {!isLoading &&
      displayWorker.realOwner.id === address &&
      displayWorker.status !== ApiWorkerStatus.Withdrawn ? (
        <Box mt={3} display="flex" justifyContent="flex-end">
          {displayWorker.status === WorkerStatus.Deregistered ||
          displayWorker.status === WorkerStatus.Deregistering ? (
            <WorkerWithdrawButton
              worker={displayWorker}
              source={{
                ...displayWorker.owner,
                locked: !!displayWorker.locked,
                lockEnd: displayWorker.lockEnd,
              }}
            />
          ) : (
            <WorkerUnregisterButton
              worker={displayWorker}
              source={displayWorker.owner}
              disabled={displayWorker.status !== WorkerStatus.Active}
            />
          )}
        </Box>
      ) : null}
    </CenteredPageWrapper>
  );
};
