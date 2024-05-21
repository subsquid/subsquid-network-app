import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useRegisterGateway } from '@api/contracts/gateway-registration/useRegisterGateway';
import { AccountType, useMySources } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { Card } from '@components/Card';
import { Form, FormikSwitch, FormikTextInput, FormRow } from '@components/Form';
import { FormikSelect } from '@components/Form/FormikSelect';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { CenteredPageWrapper, NetworkPageTitle } from '@layouts/NetworkLayout';

import { addGatewaySchema } from './gateway-schema';

export function AddNewGateway() {
  const navigate = useNavigate();
  const { registerGateway, isLoading: isRegistering, error } = useRegisterGateway();
  const { sources, isPending: isDataLoading } = useMySources();

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
      const source = sources.find(s => s.id === values.source);
      if (!source) return;

      const castedValues = addGatewaySchema.cast(values);
      if (!castedValues.public) {
        delete castedValues.email;
      }

      const { success } = await registerGateway({
        ...castedValues,
        source,
      });
      if (!success) return;

      navigate('/gateways');
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

  if (isDataLoading) return <Loader />;

  return (
    <CenteredPageWrapper>
      <NetworkPageTitle backPath="/gateways" title="Gateway registration" />

      <Form onSubmit={formik.handleSubmit}>
        <Card>
          <FormRow>
            <FormikSelect
              id="source"
              disabled
              showErrorOnlyOfTouched
              options={sources.map(s => {
                return {
                  label: <SourceWalletOption source={s} />,
                  value: s.id,
                  disabled: s.type === AccountType.Vesting,
                };
              })}
              formik={formik}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput
              showErrorOnlyOfTouched
              id="name"
              label="Gateway name"
              formik={formik}
            />
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

          <BlockchainContractError error={error} />
        </Card>
        <Box mt={2.5} justifyContent="flex-end" display="flex">
          <LoadingButton disabled={isRegistering} variant="contained" type="submit">
            Register
          </LoadingButton>
        </Box>
      </Form>
    </CenteredPageWrapper>
  );
}
