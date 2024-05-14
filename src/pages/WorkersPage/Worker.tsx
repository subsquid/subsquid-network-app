import React from 'react';

import { Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { useWorkerByPeerId, WorkerStatus } from '@api/subsquid-network-squid';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { WorkerUnregister } from '@pages/WorkersPage/WorkerUnregister';

import { WorkerCard } from './WorkerCard';
import { WorkerDelegate } from './WorkerDelegate';
import { WorkerStatistics } from './WorkerStatistics';
import { WorkerUndelegate } from './WorkerUndelegate';

// const sx = {
//   background: '#000',
//   color: '#fff',

//   '&:hover': {
//     background: '#333',
//     color: '#fff',
//   },
// };

export const Worker = ({ backPath }: { backPath: string }) => {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: worker, isPending } = useWorkerByPeerId(peerId);

  const [searchParams] = useSearchParams();

  if (isPending) return <Loader />;
  else if (!worker) {
    return (
      <Box>
        Worker <b>{peerId}</b> not found
      </Box>
    );
  }

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

      <Card>
        <WorkerCard worker={worker} />
        <Box sx={{ mt: 4 }}>
          <WorkerStatistics worker={worker} />
        </Box>
      </Card>
      {worker.ownedByMe && worker.status !== WorkerStatus.Withdrawn ? (
        <Box mt={2.5}>
          <WorkerUnregister worker={worker} />
        </Box>
      ) : null}
    </CenteredPageWrapper>
  );
};
