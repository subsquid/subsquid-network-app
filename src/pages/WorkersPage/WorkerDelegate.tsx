import React, { useEffect, useState } from 'react';

import { Button, Chip } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useWorkerDelegate } from '@api/contracts/staking';
import { formatSqd, humanReadableSqd, toSqd } from '@api/contracts/utils';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { useMySourceOptions } from '@components/SourceWallet/useMySourceOptions';
import { useContracts } from '@network/useContracts';

export const delegateSchema = (SQD_TOKEN: string) =>
  yup.object({
    source: yup.string().label('Source').trim().required('Source is required'),
    amount: yup
      .number()
      .label('Amount')
      .moreThan(0)
      .required('Amount is required')
      .max(
        yup.ref('max'),
        ({ max }) => `Amount should be less than ${formatSqd(SQD_TOKEN, new Decimal(max))} `,
      ),
    max: yup.number().label('Max').required('Max is required'),
  });

export function WorkerDelegate({ worker }: { worker: BlockchainApiWorker }) {
  const { delegateToWorker, error, isLoading } = useWorkerDelegate();
  const { SQD_TOKEN } = useContracts();

  const [open, setOpen] = useState(false);
  const handleOpen = (event: React.UIEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    sources,
    options,
    isPending: isSourceLoading,
  } = useMySourceOptions({
    enabled: open,
    sourceDisabled: s => new Decimal(s.balance).lessThanOrEqualTo(0),
  });

  const formik = useFormik({
    initialValues: {
      source: '',
      amount: '0',
      max: '0',
    },
    validationSchema: delegateSchema(SQD_TOKEN),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet) return;

      const { failedReason } = await delegateToWorker({
        worker,
        amount: toSqd(values.amount),
        wallet,
      });

      if (!failedReason) {
        handleClose();
      }
    },
  });

  useEffect(() => {
    if (isSourceLoading) return;
    else if (formik.values.source) return;

    const source =
      sources.find(c => new Decimal(c.balance).greaterThanOrEqualTo(0)) || sources?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
      max: humanReadableSqd(source.balance),
    });
  }, [formik, isSourceLoading, sources]);

  return (
    <>
      <Button disabled={!worker.delegationEnabled} onClick={handleOpen} variant="contained">
        Delegate
      </Button>
      <ContractCallDialog
        title="Delegate"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isLoading}
      >
        {isSourceLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <FormRow>
              <FormikSelect
                id="source"
                disabled={!options.length}
                showErrorOnlyOfTouched
                options={options}
                formik={formik}
                onChange={e => {
                  const wallet = sources.find(w => w?.id === e.target.value);
                  if (!wallet) return;

                  formik.setFieldValue('source', wallet.id);
                  formik.setFieldValue('max', humanReadableSqd(wallet.balance));
                }}
              />
            </FormRow>
            <FormRow>
              <FormikTextInput
                id="amount"
                label="Amount"
                formik={formik}
                showErrorOnlyOfTouched
                InputProps={{
                  endAdornment: (
                    <Chip
                      clickable
                      disabled={formik.values.max === formik.values.amount}
                      onClick={() => {
                        formik.setValues({
                          ...formik.values,
                          amount: formik.values.max,
                        });
                      }}
                      label="Max"
                    />
                  ),
                }}
              />
            </FormRow>
            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
