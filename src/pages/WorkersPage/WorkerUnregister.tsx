import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

import { useUnregisterWorker } from '@api/contracts/worker-registration/useUnregisterWorker';
import { useWithdrawWorker } from '@api/contracts/worker-registration/useWithdrawWorker';
import { BlockchainApiWorker, WorkerStatus } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';

export function WorkerUnregister({ worker }: { worker: BlockchainApiWorker }) {
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
        {!worker.canUnregister() ? (
          <LoadingButton
            loading={isWithdrawing}
            onClick={async e => {
              e.stopPropagation();
              await withdrawWorker({
                peerId: worker.peerId,
                source: worker.owner,
              });
            }}
            disabled={!worker.canWithdraw()}
            variant="contained"
            color="error"
          >
            Withdraw
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={isUnregistering}
            disabled={worker.status !== WorkerStatus.Active}
            onClick={async e => {
              e.stopPropagation();
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
        )}
      </Box>
      <BlockchainContractError error={unregisterError || withdrawError} />
    </Box>
  );
}
