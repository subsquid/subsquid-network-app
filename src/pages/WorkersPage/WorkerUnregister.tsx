import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

import { useUnregisterWorker } from '@api/contracts/worker-registration/useUnregisterWorker';
import { useWithdrawWorker } from '@api/contracts/worker-registration/useWithdrawWorker';
import { BlockchainApiFullWorker, WorkerStatus } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';

export function WorkerUnregister({ worker }: { worker: BlockchainApiFullWorker }) {
  const {
    unregisterWorker,
    error: unregisterError,
    isLoading: isUnregistering,
  } = useUnregisterWorker();
  const { withdrawWorker, error: withdrawError, isLoading: isWithdrawing } = useWithdrawWorker();

  if (!worker.ownedByMe) return null;

  return (
    <Box>
      <Box sx={{ textAlign: 'right' }}>
        {worker.status === WorkerStatus.Deregistered ? (
          <LoadingButton
            loading={isWithdrawing}
            onClick={async () => {
              await withdrawWorker({
                peerId: worker.peerId,
                source: worker.owner,
              });
            }}
            disabled={worker.locked}
            variant="contained"
            color="success"
          >
            Withdraw
          </LoadingButton>
        ) : worker.status === WorkerStatus.Active ||
          worker.status === WorkerStatus.Deregistering ? (
          <LoadingButton
            loading={isUnregistering}
            disabled={worker.status !== WorkerStatus.Active}
            onClick={async () => {
              await unregisterWorker({
                peerId: worker.peerId,
                source: worker.owner,
              });
            }}
            variant="contained"
            color="error"
          >
            Unregister
          </LoadingButton>
        ) : null}
      </Box>
      <BlockchainContractError error={unregisterError || withdrawError} />
    </Box>
  );
}
