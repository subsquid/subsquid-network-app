import React, { useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';

import { useReadRouterWorkerRegistration, workerRegistryAbi } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { Account, AccountType, Worker } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

export function WorkerUnregisterButton({
  worker,
  owner,
  disabled,
}: {
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  owner: Pick<Account, 'id' | 'type'>;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LoadingButton
        // startIcon={<Remove />}
        loading={open}
        onClick={() => setOpen(true)}
        variant="outlined"
        color="error"
        disabled={disabled}
      >
        UNREGISTER
      </LoadingButton>
      <WorkerUnregisterDialog
        open={open}
        onClose={() => setOpen(false)}
        worker={worker}
        owner={owner}
      />
    </>
  );
}

export function WorkerUnregisterDialog({
  open,
  onClose,
  worker,
  owner,
}: {
  open: boolean;
  onClose: () => void;
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  owner: Pick<Account, 'id' | 'type'>;
}) {
  const client = useClient();
  const account = useAccount();

  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const contractWriter = useWriteSQDTransaction();

  const { data: registrationAddress } = useReadRouterWorkerRegistration({
    address: contracts.ROUTER,
  });

  const handleSubmit = async () => {
    if (!client || !account.address || !registrationAddress) return;

    try {
      const peerIdHex = peerIdToHex(worker.peerId);

      const receipt = await contractWriter.writeTransactionAsync({
        address: registrationAddress,
        abi: workerRegistryAbi,
        functionName: 'deregister',
        args: [peerIdHex],
        vesting: owner.type === AccountType.Vesting ? (owner.id as `0x${string}`) : undefined,
      });
      setWaitHeight(receipt.blockNumber, []);

      onClose();
    } catch (error) {
      toast.error(errorMessage(error));
    }
  };

  return (
    <ContractCallDialog
      title="Unregister worker?"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();
        handleSubmit();
      }}
      loading={contractWriter.isPending}
      confirmButtonText="Confirm"
      hideCancelButton={false}
    >
      Are you sure you want to unregister this worker? This will disable the worker, but you can
      re-register it later. You will be able to withdraw your tokens after the end of the lock
      period.
    </ContractCallDialog>
  );
}

// export function WorkerUnregister({
//   worker,
//   disabled,
// }: {
//   worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
//   disabled?: boolean;
// }) {
//   const {
//     unregisterWorker,
//     error: unregisterError,
//     isLoading: isDeregistering,
//   } = useUnregisterWorker();
//   const { withdrawWorker, error: withdrawError, isLoading: isWithdrawing } = useWithdrawWorker();
//   const { data } = useWorkerOwner({ workerId: worker.id, enabled: !disabled });

//   return (
//     <>
//       {worker.status === WorkerStatus.Deregistered || worker.status === WorkerStatus.Withdrawn ? (
//         <LoadingButton
//           loading={isWithdrawing}
//           onClick={async e => {
//             e.stopPropagation();
//             await withdrawWorker({
//               peerId: worker.peerId,
//               source: data?.owner || { id: '', type: AccountType.User },
//             });
//           }}
//           disabled={disabled || worker.status === WorkerStatus.Withdrawn}
//           variant="outlined"
//           color="error"
//         >
//           WITHDRAW
//         </LoadingButton>
//       ) : (
//         <LoadingButton
//           loading={isDeregistering}
//           disabled={disabled || worker.status !== WorkerStatus.Active}
//           onClick={async e => {
//             e.stopPropagation();
//             await unregisterWorker({
//               peerId: worker.peerId,
//               source: data?.owner || { id: '', type: AccountType.User },
//             });
//           }}
//           variant="outlined"
//           color="error"
//         >
//           UNREGISTER
//         </LoadingButton>
//       )}
//     </>
//   );
// }
