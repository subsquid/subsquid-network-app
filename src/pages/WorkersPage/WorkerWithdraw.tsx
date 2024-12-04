import React, { useState } from 'react';

import { dateFormat } from '@i18n';
import { peerIdToHex } from '@lib/network';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, SxProps, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';

import { useReadRouterWorkerRegistration, workerRegistryAbi } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType, SourceWallet, Worker } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { useCountdown } from '@hooks/useCountdown';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

function UnlocksTooltip({ timestamp }: { timestamp?: string }) {
  const timeLeft = useCountdown({ timestamp });

  return <span>{`Unlocks in ${timeLeft} (${dateFormat(timestamp, 'dateTime')})`}</span>;
}

export function WorkerWithdrawButton({
  worker,
  source,
  disabled,
  sx,
}: {
  sx?: SxProps;
  worker: Pick<Worker, 'id' | 'status' | 'peerId'>;
  source: SourceWallet & {
    locked: boolean;
    unlockedAt?: string;
  };
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip
        title={!disabled && source.unlockedAt && <UnlocksTooltip timestamp={source.unlockedAt} />}
        placement="top"
      >
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          {source.locked && !disabled && (
            <Lock
              fontSize="small"
              // color="secondary"
              sx={{
                color: '#3e4a5c',
                position: 'absolute',
                top: '0px',
                right: '0px',
                transform: 'translate(0%, -25%)',
                zIndex: 1,
              }}
            />
          )}
          <LoadingButton
            loading={open}
            onClick={() => setOpen(true)}
            variant="outlined"
            color="error"
            disabled={disabled || source.locked}
          >
            WITHDRAW
          </LoadingButton>
        </Box>
      </Tooltip>
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
      title="Withdraw worker?"
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
