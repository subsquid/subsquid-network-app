import { Box, Stack } from '@mui/material';
import { satisfies } from 'semver';

import { BlockchainApiWorker, useNetworkSettings } from '@api/subsquid-network-squid';
import { WarningIcon } from '@icons/WarningIcon';

export const WorkerVersion = ({ worker }: { worker: Pick<BlockchainApiWorker, 'version'> }) => {
  const { minimalWorkerVersion, recommendedWorkerVersion } = useNetworkSettings();

  return (
    <>
      {worker.version ? (
        <Stack spacing={1} direction="row" alignItems="center">
          <Box>{worker.version}</Box>
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
