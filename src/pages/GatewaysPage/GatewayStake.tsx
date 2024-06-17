import React, { useEffect, useMemo, useState } from 'react';

import { dateFormat } from '@i18n';
import { fromSqd, toSqd } from '@lib/network/utils';
import { Box, Button, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import { useFormik } from 'formik';
import { useDebounce } from 'use-debounce';

import { useStakeGateway } from '@api/contracts/gateway-registration/useStakeGateway';
import { useMyGatewayStakes } from '@api/subsquid-network-squid/gateways-graphql';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikSwitch, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { useMySourceOptions } from '@components/SourceWallet/useMySourceOptions';

const MIN_BLOCKS_LOCK = 1000;

export const stakeSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
  amount: yup
    .decimal()
    .label('Amount')
    .required()
    .positive()
    .max(yup.ref('max'))
    .typeError('${path} is invalid'),
  max: yup.string().label('Max').required().typeError('${path} is invalid'),
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    sources,
    options,
    isPending: isSourceLoading,
  } = useMySourceOptions({
    sourceDisabled: s => s.balance === '0' || !!data?.operators.some(o => o.account.id === s.id),
  });

  const formik = useFormik({
    initialValues: {
      source: '',
      amount: '0',
      max: '0',
      autoExtension: false,
      durationBlocks: MIN_BLOCKS_LOCK,
    },
    validationSchema: stakeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet) return;

      const { failedReason } = await stakeToGateway({
        amount: toSqd(values.amount),
        durationBlocks: values.durationBlocks,
        autoExtension: values.autoExtension,
        wallet,
      });

      if (!failedReason) {
        handleClose();
      }
    },
  });

  const source = useMemo(() => {
    if (isSourceLoading) return;

    return (
      (formik.values.source
        ? sources.find(c => c.id === formik.values.source)
        : sources.find(c => fromSqd(c.balance).gte(0))) || sources?.[0]
    );
  }, [formik.values.source, isSourceLoading, sources]);

  useEffect(() => {
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
      max: fromSqd(source.balance).toFixed(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const [lockDuration] = useDebounce(formik.values.durationBlocks, 500);
  const unlockAt = useMemo(() => {
    if (!data) return Date.now();

    return lockDuration * (data.blockTimeL1 || 0) + new Date(data.lastBlockTimestampL1).getTime();
  }, [data, lockDuration]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        disabled={disabled || data?.operators.length === sources.length}
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
                autoComplete="off"
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
                autoComplete="off"
              />
            </FormRow>
            <FormRow>
              <FormikSwitch id="autoExtension" label="Auto extension" formik={formik} />
            </FormRow>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Unlock at</Box>
              <Stack direction="row">
                ~{dateFormat(unlockAt, 'dateTime')}
                <HelpTooltip help="Automatically relocked if auto extension is enabled" />
              </Stack>
            </Stack>

            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
