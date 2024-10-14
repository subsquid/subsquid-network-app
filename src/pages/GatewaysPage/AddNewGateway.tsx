import React, { useEffect, useState } from 'react';

import { peerIdToHex } from '@lib/network';
import { Add } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, SxProps } from '@mui/material';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';

import { gatewayRegistryAbi } from '@api/contracts';
import { encodeGatewayMetadata } from '@api/contracts/gateway-registration/GatewayMetadata';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType, useMySources } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSwitch, FormikTextInput, FormRow } from '@components/Form';
import { FormikSelect } from '@components/Form/FormikSelect';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { addGatewaySchema } from './gateway-schema';

export function AddGatewayButton({ sx, disabled }: { sx?: SxProps; disabled?: boolean }) {
  const [open, setOpen] = useState(false);

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
        ADD PORTAL
      </LoadingButton>
      <AddGatewayDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function AddGatewayDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const client = useClient();
  const contracts = useContracts();
  // const { registerGateway, isLoading: isRegistering, error } = useRegisterGateway();
  const { sources, isPending: isDataLoading } = useMySources();
  const { writeTransactionAsync, isPending } = useWriteSQDTransaction();
  const { setWaitHeight } = useSquidHeight();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      website: '',
      public: false,
      email: '',
      peerId: '',
      endpointUrl: '',
      source: '',
    },
    validationSchema: addGatewaySchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      if (!client) return;

      const source = sources.find(s => s.id === values.source);
      if (!source) return;

      try {
        const castedValues = addGatewaySchema.cast(values);
        if (!castedValues.public) {
          delete castedValues.email;
        }

        const receipt = await writeTransactionAsync({
          address: contracts.GATEWAY_REGISTRATION,
          abi: gatewayRegistryAbi,
          functionName: 'register',
          args: [peerIdToHex(castedValues.peerId), encodeGatewayMetadata(castedValues)],
        });
        setWaitHeight(receipt.blockNumber, []);

        onClose();
      } catch (e: unknown) {
        toast.custom(<Alert color="error">{errorMessage(e)}</Alert>);
      }
    },
  });

  useEffect(() => {
    if (isDataLoading) return;
    else if (formik.values.source) return;

    const contract = sources[0];
    if (!contract) return;

    formik.setValues({
      ...formik.values,
      source: contract.id,
    });
  }, [formik, isDataLoading, sources]);

  return (
    <ContractCallDialog
      title="Lock"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();

        formik.handleSubmit();
      }}
      loading={isPending}
      confirmButtonText="Register"
    >
      {isDataLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              id="source"
              showErrorOnlyOfTouched
              options={sources.map(s => {
                return {
                  label: <SourceWalletOption source={s} />,
                  value: s.id,
                  disabled: s.type !== AccountType.User,
                };
              })}
              formik={formik}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput showErrorOnlyOfTouched id="name" label="Portal name" formik={formik} />
          </FormRow>
          <FormRow>
            <FormikTextInput showErrorOnlyOfTouched id="peerId" label="Peer ID" formik={formik} />
          </FormRow>

          <FormRow>
            <FormikSwitch id="public" label="Publicly available" formik={formik} />
          </FormRow>

          {formik.values.public ? (
            <>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="endpointUrl"
                  label="Public endpoint URL"
                  formik={formik}
                />
              </FormRow>
              <FormRow>
                <FormikTextInput
                  showErrorOnlyOfTouched
                  id="email"
                  label="Email address"
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
            </>
          ) : null}
        </Form>
      )}
    </ContractCallDialog>
  );
}
