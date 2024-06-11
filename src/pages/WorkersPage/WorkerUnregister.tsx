import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

import { useUnregisterWorker } from '@api/contracts/worker-registration/useUnregisterWorker';
import { useWithdrawWorker } from '@api/contracts/worker-registration/useWithdrawWorker';
import { AccountType, useWorkerOwner, Worker, WorkerStatus } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';

export function WorkerUnregister({
  worker,
  disabled,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  disabled?: boolean;
}) {
  const {
    unregisterWorker,
    error: unregisterError,
    isLoading: isDeregistering,
  } = useUnregisterWorker();
  const { withdrawWorker, error: withdrawError, isLoading: isWithdrawing } = useWithdrawWorker();
  const { data } = useWorkerOwner({ workerId: worker.id, enabled: !disabled });

  return (
    <Box>
      <Box sx={{ textAlign: 'right' }}>
        {worker.status === WorkerStatus.Deregistered || worker.status === WorkerStatus.Withdrawn ? (
          <LoadingButton
            loading={isWithdrawing}
            onClick={async e => {
              e.stopPropagation();
              await withdrawWorker({
                peerId: worker.peerId,
                source: data?.owner || { id: '', type: AccountType.User },
              });
            }}
            disabled={disabled || worker.status === WorkerStatus.Withdrawn}
            variant="contained"
            color="error"
          >
            Withdraw
          </LoadingButton>
        ) : (
          <LoadingButton
            loading={isDeregistering}
            disabled={disabled || worker.status !== WorkerStatus.Active}
            onClick={async e => {
              e.stopPropagation();
              await unregisterWorker({
                peerId: worker.peerId,
                source: data?.owner || { id: '', type: AccountType.User },
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
