import React, { useState } from 'react';

import { LockOpen as LockOpenIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/material';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';
import * as yup from 'yup';

import { gatewayRegistryAbi } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

export const stakeSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
  // amount: yup
  //   .number()
  //   .label('Amount')
  //   .moreThan(0)
  //   .required('Amount is required')
  //   .max(yup.ref('max'), ({ max }) => `Amount should be less than ${formatSqd(max)} `),
});

export function GatewayUnstakeButton({ sx, disabled }: { sx?: SxProps; disabled?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LoadingButton
        startIcon={<LockOpenIcon />}
        disabled={disabled}
        loading={open}
        variant="contained"
        color="error"
        onClick={() => setOpen(true)}
        sx={sx}
      >
        WITHDRAW
      </LoadingButton>
      <GatewayUnstakeDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function GatewayUnstakeDialog({ onClose, open }: { onClose: () => void; open: boolean }) {
  const client = useClient();
  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const gatewayRegistryContract = useWriteSQDTransaction();

  const handleSubmit = async () => {
    if (!client) return;

    try {
      const receipt = await gatewayRegistryContract.writeTransactionAsync({
        address: contracts.GATEWAY_REGISTRATION,
        abi: gatewayRegistryAbi,
        functionName: 'unstake',
        args: [],
      });
      setWaitHeight(receipt.blockNumber, []);

      onClose();
    } catch (e: unknown) {
      toast.error(errorMessage(e));
    }
  };

  return (
    <ContractCallDialog
      title="Withdraw tokens?"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();

        handleSubmit();
      }}
      loading={gatewayRegistryContract.isPending}
      hideCancelButton={false}
    >
      Are you sure you want to withdraw your tokens? This will return all previously locked tokens
      to your wallet.
    </ContractCallDialog>
  );
}
