import React from 'react';

import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { useWorkerByPeerId, WorkerStatus } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { WorkerUnregister } from '@pages/WorkersPage/WorkerUnregister';

import { ReleaseButton } from './ReleaseButton';

export function Vesting({ backPath }: { backPath: string }) {
  const { address } = useParams<{ address: string }>();
  const { data: worker, isPending } = useWorkerByPeerId(address);

  const [searchParams] = useSearchParams();

  if (isPending) return <Loader />;
  else if (!worker) {
    return <Box>{/* Worker <b>{peerId}</b> not found */}</Box>;
  }

  return (
    <CenteredPageWrapper className="wide">
      <NetworkPageTitle
        backPath={searchParams.get('backPath') || backPath}
        endAdornment={
          <Stack direction="row" spacing={2}>
            <ReleaseButton vesting={{}} />
          </Stack>
        }
      />
    </CenteredPageWrapper>
  );
}
