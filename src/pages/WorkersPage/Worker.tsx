import React from 'react';

import { Divider } from '@mui/material';
import { Box } from '@mui/system';
import { useParams, useSearchParams } from 'react-router-dom';

import { useWorkerByPeerId } from '@api/subsquid-network-squid';
import { BackButton } from '@components/BackButton';
import { Card } from '@components/Card';
import { Loader } from '@components/Loader';
import { CenteredPageWrapper } from '@layouts/NetworkLayout';
import { WorkerUnregister } from '@pages/WorkersPage/WorkerUnregister';

import { MyWorkerStat } from './MyWorkerStat';
import { WorkerCard } from './WorkerCard';
import { WorkerStatistics } from './WorkerStatistics';

const sx = {
  background: '#000',
  color: '#fff',

  '&:hover': {
    background: '#333',
    color: '#fff',
  },
};

const Worker = ({ backPath }: { backPath: string }) => {
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
      <Box sx={{ mb: 3 }}>
        <BackButton sx={sx} path={searchParams.get('backPath') || backPath} />
      </Box>
      <Card>
        <WorkerCard worker={worker} />

        {worker.ownedByMe ? (
          <Box sx={{ mt: 7.5 }}>
            <MyWorkerStat worker={worker} />
          </Box>
        ) : null}

        <Box sx={{ mt: 7.5 }}>
          <WorkerStatistics worker={worker} />
        </Box>

        {worker.ownedByMe ? (
          <>
            <Divider sx={{ my: 4 }} />
            <WorkerUnregister worker={worker} />
          </>
        ) : null}
      </Card>
    </CenteredPageWrapper>
  );
};

export default Worker;
