import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';

import { useUpdateWorker } from '@api/contracts/worker-registration/useUpdateWorker';
import { BlockchainApiFullWorker, useWorkerByPeerId } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { Card } from '@components/Card';
import { Form, FormikTextInput, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { NetworkPageTitle, CenteredPageWrapper } from '@layouts/NetworkLayout';
import { editWorkerSchema } from '@pages/WorkersPage/worker-schema';

function WorkerForm({ worker }: { worker: BlockchainApiFullWorker }) {
  const { updateWorker, isLoading: isUpdating, error } = useUpdateWorker();

  const formik = useFormik({
    initialValues: {
      name: worker.name || '',
      description: worker.description || '',
      website: worker.website || '',
      email: worker.email || '',
    },
    validationSchema: editWorkerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const { success } = await updateWorker({
        ...values,
        peerId: worker.peerId,
        source: worker.owner,
      });
      if (!success) return;
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Card>
        <FormRow>
          <FormikTextInput showErrorOnlyOfTouched id="name" label="Worker name" formik={formik} />
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
        <Box>
          <LoadingButton disabled={isUpdating} variant="contained" type="submit">
            Update
          </LoadingButton>
        </Box>
      </Card>
    </Form>
  );
}

export function WorkerEdit() {
  const { peerId } = useParams<{ peerId: string }>();
  const { data: worker, isPending } = useWorkerByPeerId(peerId);

  if (isPending) return <Loader />;
  else if (!worker) {
    return (
      <Box>
        Worker <b>{peerId}</b> not found
      </Box>
    );
  }

  return (
    <CenteredPageWrapper>
      <NetworkPageTitle backPath={`/profile/workers/${peerId}`} title="Edit worker" />
      <WorkerForm worker={worker} />
    </CenteredPageWrapper>
  );
}
