import React, { useMemo, useState } from 'react';

import { fromSqd, peerIdToHex } from '@lib/network/utils';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import useLocalStorageState from 'use-local-storage-state';
import { useClient } from 'wagmi';

import {
  useReadRouterWorkerRegistration,
  useReadWorkerRegistryBondAmount,
  workerRegistryAbi,
} from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { encodeWorkerMetadata } from '@api/contracts/worker-registration/WorkerMetadata';
import { AccountType, useAccountQuery, useSquid } from '@api/subsquid-network-squid';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikCheckBoxInput, FormikTextInput, FormRow } from '@components/Form';
import { FormikSelect } from '@components/Form/FormikSelect';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { useWorkersChatUrl } from '@network/useWorkersChat';

import { addWorkerSchema } from './worker-schema';

export function AddNewWorker({ sx, disabled }: { sx?: SxProps; disabled?: boolean }) {
  const [open, setOpen] = useState(false);

  const [isJoinChatOpen, setJoinChatOpen] = useState(false);
  const [skipWorkerJoinChat] = useLocalStorageState<boolean>('sqd_skip_join_workers_chat');

  return (
    <>
      <LoadingButton
        disabled={disabled}
        sx={sx}
        loading={open}
        color="info"
        startIcon={<Add />}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        ADD WORKER
      </LoadingButton>
      <AddNewWorkerDialog
        open={open}
        onResult={confirmed => {
          setOpen(false);

          if (confirmed && !skipWorkerJoinChat) {
            setJoinChatOpen(true);
          }
        }}
      />
      <JoinChatDialog
        open={isJoinChatOpen}
        onResult={() => {
          setJoinChatOpen(false);
        }}
      />
    </>
  );
}

export function AddNewWorkerDialog({
  open,
  onResult,
}: {
  open: boolean;
  onResult: (confirmed: boolean) => void;
}) {
  const client = useClient();
  const account = useAccount();
  const squid = useSquid();

  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const contractWriter = useWriteSQDTransaction();

  const { data: workerRegistryAddress, isLoading: isWorkerRegistryAddressLoading } =
    useReadRouterWorkerRegistration({
      address: contracts.ROUTER,
    });

  const { data: bondAmount, isPending: isBondLoading } = useReadWorkerRegistryBondAmount({
    address: workerRegistryAddress,
  });

  const { data: accountQuery, isLoading: isAccountQueryLoading } = useAccountQuery(squid, {
    address: account.address || '0x',
  });

  const isLoading = isWorkerRegistryAddressLoading || isBondLoading || isAccountQueryLoading;

  const sources = useMemo(() => {
    if (!accountQuery?.accountById) return [];

    return [accountQuery.accountById, ...accountQuery.accountById.owned].map(s => {
      return {
        id: s.id,
        type: s.type,
        balance: s.balance,
        disabled: !bondAmount || BigNumber(s.balance).lte(bondAmount.toString()),
      };
    });
  }, [accountQuery?.accountById, bondAmount]);

  const initialValues = useMemo(() => {
    const source = sources.find(c => !c.disabled) || sources?.[0];

    return {
      name: '',
      description: '',
      website: '',
      email: '',
      peerId: '',
      source: source?.id || '',
      bond: fromSqd(bondAmount).toString(),
    };
  }, [bondAmount, sources]);

  const formik = useFormik({
    initialValues,
    validationSchema: addWorkerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: async values => {
      if (!client || !account.address || !workerRegistryAddress || !bondAmount) return;

      try {
        const { peerId, source: sourceId, ...metadata } = addWorkerSchema.cast(values);

        const source = sources.find(s => s.id === sourceId);
        if (!source) return;

        const peerIdHex = peerIdToHex(peerId);

        const receipt = await contractWriter.writeTransactionAsync({
          address: workerRegistryAddress,
          abi: workerRegistryAbi,
          functionName: 'register',
          args: [peerIdHex, encodeWorkerMetadata(metadata)],
          vesting: source.type === AccountType.Vesting ? (source.id as `0x${string}`) : undefined,
          approve: bondAmount,
        });
        setWaitHeight(receipt.blockNumber, []);

        formik.resetForm();

        onResult(true);
      } catch (error) {
        toast.error(errorMessage(error));
      }
    },
  });

  return (
    <>
      <ContractCallDialog
        title="Worker registration"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return onResult(confirmed);

          formik.handleSubmit();
        }}
        loading={contractWriter.isPending}
        confirmButtonText="Confirm"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Form onSubmit={formik.handleSubmit}>
              <FormRow>
                <FormikSelect
                  id="source"
                  disabled={!sources.length}
                  showErrorOnlyOfTouched
                  options={sources.map(s => {
                    return {
                      label: <SourceWalletOption source={s} />,
                      value: s.id,
                      disabled: s.disabled,
                    };
                  })}
                  formik={formik}
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="bond"
                  label="Bond amount"
                  formik={formik}
                  disabled
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="peerId"
                  label="Peer ID"
                  formik={formik}
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="name"
                  label="Worker name"
                  formik={formik}
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="description"
                  multiline
                  minRows={3}
                  label="Description"
                  formik={formik}
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="website"
                  label="Website"
                  formik={formik}
                />
              </FormRow>
            </Form>
          </>
        )}
      </ContractCallDialog>
    </>
  );
}

function JoinChatDialog({
  open,
  onResult,
}: {
  open: boolean;
  onResult: (confirmed: boolean) => void;
}) {
  const [, setSkipWorkerJoinChat] = useLocalStorageState<boolean>('sqd_skip_join_workers_chat');
  const chatUrl = useWorkersChatUrl();

  const formik = useFormik({
    initialValues: {
      doNotShow: false,
    },

    onSubmit: async values => {
      setSkipWorkerJoinChat(values.doNotShow);
      onResult(true);
    },
  });

  return (
    <ConfirmDialog
      open={open}
      title="Registered"
      confirmButtonText="Join chat"
      confirmColor="success"
      hideCancelButton
      onApprove={() => window.open(chatUrl)}
      onResult={(confirmed: boolean) => {
        if (!confirmed) onResult(confirmed);

        formik.handleSubmit();
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        Join the <b>Subsquid Network</b> node operators chat for support and updates on worker
        images.
        <FormRow>
          <FormikCheckBoxInput id="doNotShow" label="Don't show this again" formik={formik} />
        </FormRow>
      </Form>
    </ConfirmDialog>
  );
}

// export function AddNewWorker() {
//   return (
//     <CenteredPageWrapper>
//       <ConnectedWalletRequired>
//         <NetworkPageTitle backPath="/workers"></NetworkPageTitle>
//         <AddWorkerForm />
//       </ConnectedWalletRequired>
//     </CenteredPageWrapper>
//   );
// }
