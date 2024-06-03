import { Box, Stack, styled } from '@mui/material';
import { satisfies } from 'semver';

import { BlockchainApiWorker, useNetworkSettings } from '@api/subsquid-network-squid';
import { WarningIcon } from '@icons/WarningIcon';

export const WorkerVersionName = styled(Box, {
  name: 'WorkerVersionName',
})(() => ({
  whiteSpace: 'nowrap',
}));

export const WorkerVersion = ({ worker }: { worker: Pick<BlockchainApiWorker, 'version'> }) => {
  const { minimalWorkerVersion, recommendedWorkerVersion } = useNetworkSettings();

  return (
    <>
      {worker.version ? (
        <Stack spacing={1} direction="row" alignItems="center">
          <WorkerVersionName>{worker.version}</WorkerVersionName>
          {!satisfies(worker.version, recommendedWorkerVersion) ? (
            !satisfies(worker.version, minimalWorkerVersion) ? (
              <WarningIcon color="error" />
            ) : (
              <WarningIcon color="warning" />
            )
          ) : null}
        </Stack>
      ) : (
        <Box>-</Box>
      )}
    </>
  );
};
