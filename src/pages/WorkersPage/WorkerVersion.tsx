import { Box, Stack, styled } from '@mui/material';
import { satisfies } from 'semver';

import { Worker, useNetworkSettings } from '@api/subsquid-network-squid';
import { WarningIcon } from '@icons/WarningIcon';

export const WorkerVersionName = styled(Box, {
  name: 'WorkerVersionName',
})(() => ({
  display: 'flex',
  whiteSpace: 'nowrap',
}));

export const WorkerVersion = ({ worker }: { worker: Pick<Worker, 'version'> }) => {
  const { minimalWorkerVersion, recommendedWorkerVersion } = useNetworkSettings();

  return (
    <>
      {worker.version ? (
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <WorkerVersionName>{worker.version}</WorkerVersionName>
          <Box display="flex">
            {!satisfies(worker.version, recommendedWorkerVersion) ? (
              !satisfies(worker.version, minimalWorkerVersion) ? (
                <WarningIcon color="error" />
              ) : (
                <WarningIcon color="warning" />
              )
            ) : null}
          </Box>
        </Stack>
      ) : (
        <Box>-</Box>
      )}
    </>
  );
};
