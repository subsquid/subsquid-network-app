import React, { useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/material';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';

import { useReadRouterWorkerRegistration, workerRegistryAbi } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType, SourceWallet, Worker } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

export function WorkerWithdrawButton({
  worker,
  source,
  disabled,
  sx,
}: {
  sx?: SxProps;
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  source: SourceWallet;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LoadingButton
        // startIcon={<ArrowUpwardOutlined />}
        sx={sx}
        loading={open}
        onClick={() => setOpen(true)}
        variant="outlined"
        color="error"
        disabled={disabled}
      >
        WITHDRAW
      </LoadingButton>
      <WorkerWithdrawDialog
        open={open}
        onClose={() => setOpen(false)}
        worker={worker}
        source={source}
      />
    </>
  );
}

export function WorkerWithdrawDialog({
  open,
  onClose,
  worker,
  source,
}: {
  open: boolean;
  onClose: () => void;
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  source: SourceWallet;
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
    if (!client) return;
    if (!account.address || !registrationAddress) return;

    try {
      const peerIdHex = peerIdToHex(worker.peerId);

      const receipt = await contractWriter.writeTransactionAsync({
        address: registrationAddress,
        abi: workerRegistryAbi,
        functionName: 'withdraw',
        args: [peerIdHex],
        vesting: source.type === AccountType.Vesting ? (source.id as `0x${string}`) : undefined,
      });
      setWaitHeight(receipt.blockNumber, []);

      onClose();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
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
      hideCancelButton={false}
    >
      Are you sure you want to withdraw your tokens from this worker?
    </ContractCallDialog>
  );
}
