import React, { useEffect, useMemo, useState } from 'react';

import { fromSqd } from '@lib/network/utils';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useLocalStorageState from 'use-local-storage-state';

import { useRegisterWorker } from '@api/contracts/worker-registration/useRegisterWorker';
import { useMySources } from '@api/subsquid-network-squid';
import { useNetworkSettings } from '@api/subsquid-network-squid/settings-graphql';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { Card } from '@components/Card';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { Form, FormikCheckBoxInput, FormikTextInput, FormRow } from '@components/Form';
import { FormikSelect } from '@components/Form/FormikSelect';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';
import { ConnectedWalletRequired } from '@network/ConnectedWalletRequired';
import { useWorkersChatUrl } from '@network/useWorkersChat';

import { addWorkerSchema } from './worker-schema';

function JoinChatDialog({ open, onResult }: { open: boolean; onResult: () => void }) {
  const [, setSkipWorkerJoinChat] = useLocalStorageState<boolean>('skip_join_workers_chat');
  const chatUrl = useWorkersChatUrl();

  const formik = useFormik({
    initialValues: {
      doNotShow: false,
    },

    onSubmit: async values => {
      setSkipWorkerJoinChat(values.doNotShow);
      onResult();
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
      onResult={formik.submitForm}
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

function AddWorkerForm() {
  const navigate = useNavigate();
  const { bondAmount, isPending: isSettingsLoading } = useNetworkSettings();
  const { sources, isPending: isContractsLoading } = useMySources();
  const { registerWorker, isLoading, error } = useRegisterWorker();
  const [isJoinChatOpen, setJoinChatOpen] = useState(false);
  const [skipWorkerJoinChat] = useLocalStorageState<boolean>('skip_join_workers_chat');

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      website: '',
      email: '',
      peerId: '',
      source: '',
    },
    validationSchema: addWorkerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const source = sources.find(s => s.id === values.source);
      if (!source) return;

      const { success } = await registerWorker({
        ...values,
        source,
      });
      if (!success) return;

      if (skipWorkerJoinChat) {
        navigate('/workers');
      } else {
        setJoinChatOpen(true);
      }
    },
  });

  const source = useMemo(() => {
    if (isContractsLoading) return;
    if (isSettingsLoading) return;

    return (
      (formik.values.source
        ? sources.find(c => c.id === formik.values.source)
        : sources.find(c => fromSqd(c.balance).gte(0))) || sources?.[0]
    );
  }, [formik.values.source, isContractsLoading, isSettingsLoading, sources]);

  useEffect(() => {
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  return (
    <>
      {isContractsLoading ? (
        <Loader />
      ) : (
        <>
          <Form onSubmit={formik.handleSubmit}>
            <Card>
              <FormRow>
                <FormikSelect
                  id="source"
                  disabled={!sources.length}
                  showErrorOnlyOfTouched
                  options={sources.map(s => {
                    return {
                      label: <SourceWalletOption source={s} />,
                      value: s.id,
                      disabled: BigNumber(s.balance).lt(bondAmount),
                    };
                  })}
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
                  id="peerId"
                  label="Peer ID"
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
              <BlockchainContractError error={error} />
            </Card>
            <Box mt={2.5} justifyContent="flex-end" display="flex">
              <LoadingButton disabled={isLoading} variant="contained" type="submit">
                Register
              </LoadingButton>
            </Box>
          </Form>
          <JoinChatDialog
            open={isJoinChatOpen}
            onResult={() => {
              navigate('/workers');
              setJoinChatOpen(false);
            }}
          />
        </>
      )}
    </>
  );
}

export function AddNewWorker() {
  return (
    <CenteredPageWrapper>
      <ConnectedWalletRequired>
        <NetworkPageTitle backPath="/workers" title="Worker registration"></NetworkPageTitle>
        <AddWorkerForm />
      </ConnectedWalletRequired>
    </CenteredPageWrapper>
  );
}
