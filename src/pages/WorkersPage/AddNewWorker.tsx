import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { fromSqd } from '@api/contracts/utils';
import { useRegisterWorker } from '@api/contracts/worker-registration/useRegisterWorker';
import { useMySources } from '@api/subsquid-network-squid';
import { useNetworkSettings } from '@api/subsquid-network-squid/settings-graphql';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { Card } from '@components/Card';
import { Form, FormikTextInput, FormRow } from '@components/Form';
import { FormikSelect } from '@components/Form/FormikSelect';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';

import { addWorkerSchema } from './worker-schema';

export function AddNewWorker() {
  const navigate = useNavigate();
  const { registerWorker, isLoading, error } = useRegisterWorker();
  const { bondAmount, isPending: isSettingsLoading } = useNetworkSettings();
  const { sources, isPending: isContractsLoading } = useMySources();

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

      navigate('/workers');
    },
  });

  useEffect(() => {
    if (isContractsLoading) return;
    else if (formik.values.source) return;
    else if (isSettingsLoading) return;

    const source =
      sources.find(c => fromSqd(c.balance).greaterThanOrEqualTo(bondAmount)) || sources[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
    });
  }, [formik, isContractsLoading, sources, bondAmount, isSettingsLoading]);

  if (isContractsLoading) return <Loader />;

  return (
    <CenteredPageWrapper>
      <NetworkPageTitle backPath="/workers" title="Worker registration">
        {/*Worker registration Lorem ipsum dolor sit amet consectetur. Learn more quis tempus proin. Id*/}
        {/*rhoncus cras nibh vitae in quis porttitor cum laoreet. Integer consectetur lacus at netus.*/}
        {/*Tincidunt aliquam.*/}
      </NetworkPageTitle>

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
                  disabled: new Decimal(s.balance).lessThan(bondAmount),
                };
              })}
              formik={formik}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput showErrorOnlyOfTouched id="name" label="Worker name" formik={formik} />
          </FormRow>
          <FormRow>
            <FormikTextInput showErrorOnlyOfTouched id="peerId" label="Peer ID" formik={formik} />
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
            <FormikTextInput showErrorOnlyOfTouched id="website" label="Website" formik={formik} />
          </FormRow>

          <BlockchainContractError error={error} />
        </Card>
        <Box mt={2.5} justifyContent="flex-end" display="flex">
          <LoadingButton disabled={isLoading} variant="contained" type="submit">
            Register
          </LoadingButton>
        </Box>
      </Form>
    </CenteredPageWrapper>
  );
}
