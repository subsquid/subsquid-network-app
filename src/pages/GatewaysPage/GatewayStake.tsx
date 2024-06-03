import React, { useEffect, useState } from 'react';

import { Button, Chip } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useStakeGateway } from '@api/contracts/gateway-registration/useStakeGateway';
import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useMyGatewayStakes } from '@api/subsquid-network-squid/gateways-graphql';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikSwitch, FormikTextInput, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { useMySourceOptions } from '@components/SourceWallet/useMySourceOptions';
import { useContracts } from '@network/useContracts';

const MIN_BLOCKS_LOCK = 1000;

export const stakeSchema = (SQD_TOKEN: string) =>
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
    autoExtension: yup.boolean().label('Auto extend').default(true),
    durationBlocks: yup
      .number()
      .label('Locked blocks duration')
      .min(MIN_BLOCKS_LOCK, ({ min }) => `Tokens must be locked at least ${min} blocks`)
      .required('Lock min blocks is required'),
  });

export function GatewayStake({ disabled }: { disabled?: boolean }) {
  const { data } = useMyGatewayStakes();
  const { stakeToGateway, error, isLoading } = useStakeGateway();
  const { SQD_TOKEN } = useContracts();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    sources,
    options,
    isPending: isSourceLoading,
  } = useMySourceOptions({
    enabled: open,
    sourceDisabled: s => s.balance === '0',
  });

  const formik = useFormik({
    initialValues: {
      source: '',
      amount: 0,
      max: 0,
      autoExtension: false,
      durationBlocks: MIN_BLOCKS_LOCK,
    },
    validationSchema: stakeSchema(SQD_TOKEN),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet) return;

      const { failedReason } = await stakeToGateway({
        amount: values.amount,
        durationBlocks: values.durationBlocks,
        autoExtension: values.autoExtension,
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
      sources.find(
        s =>
          new Decimal(s.balance).greaterThanOrEqualTo(0) &&
          !!data?.some(o => o.account.id === s.id),
      ) || sources?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
      max: fromSqd(source.balance).toNumber(),
    });
  }, [data, formik, isSourceLoading, sources]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        disabled={disabled || data?.length === sources.length}
      >
        Add lock
      </Button>
      <ContractCallDialog
        title="Lock"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isLoading}
        confirmButtonText="Lock"
      >
        {isSourceLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <FormRow>
              <FormikSelect
                id="source"
                showErrorOnlyOfTouched
                options={options}
                formik={formik}
                onChange={e => {
                  const wallet = sources.find(w => w?.id === e.target.value);
                  if (!wallet) return;

                  formik.setFieldValue('source', wallet.id);

                  const balance = fromSqd(wallet.balance).toNumber();
                  formik.setFieldValue('max', balance);
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
            <FormRow>
              <FormikTextInput
                id="durationBlocks"
                label="Lock blocks duration"
                formik={formik}
                showErrorOnlyOfTouched
              />
            </FormRow>
            <FormRow>
              <FormikSwitch id="autoExtension" label="Auto extension" formik={formik} />
            </FormRow>
            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
