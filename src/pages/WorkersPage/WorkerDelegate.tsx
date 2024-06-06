import React, { useEffect, useState } from 'react';

import { percentFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd } from '@lib/network/utils';
import { Box, Button, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useDebounce } from 'use-debounce';

import { useCapedStakeAfterDelegation, useWorkerDelegate } from '@api/contracts/staking';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { useMySourceOptions } from '@components/SourceWallet/useMySourceOptions';

export const delegateSchema = yup.object({
  source: yup.string().label('Source').trim().required().typeError('${path} is invalid'),
  amount: yup
    .decimal()
    .label('Amount')
    .required()
    .positive()
    .max(yup.ref('max'))
    .typeError('${path} is invalid'),
  max: yup.string().label('Max').required().typeError('${path} is invalid'),
});

export function WorkerDelegate({
  worker,
  disabled,
}: {
  worker?: BlockchainApiWorker;
  disabled?: boolean;
}) {
  const { delegateToWorker, error, isLoading } = useWorkerDelegate();

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
    sourceDisabled: s => BigNumber(s.balance).lte(0),
  });

  const formik = useFormik({
    initialValues: {
      source: '',
      amount: '',
      max: '0',
    },
    validationSchema: delegateSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet || !worker) return;

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

  const [delegation] = useDebounce(formik.values.amount, 400);
  const {
    data: { delegationCapacity },
    isPending: isCapedDelegationLoading,
  } = useCapedStakeAfterDelegation({
    workerId: worker?.id || '',
    amount: toSqd(delegation),
    enabled: open && !!worker,
  });

  useEffect(() => {
    if (isSourceLoading) return;
    else if (formik.values.source) return;

    const source = sources.find(c => fromSqd(c.balance).gte(0)) || sources?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
      max: fromSqd(source.balance).toFixed(),
    });
  }, [formik, isSourceLoading, sources]);

  return (
    <>
      <Button
        disabled={disabled || !worker?.delegationEnabled}
        onClick={handleOpen}
        variant="contained"
      >
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
                  formik.setFieldValue('max', fromSqd(wallet.balance).toFixed());
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
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Delegation capacity</Box>
              <Stack direction="row">
                {isCapedDelegationLoading ? '-' : percentFormatter(delegationCapacity)}
                <HelpTooltip help="Lower factor leads to lower APR" />
              </Stack>
            </Stack>

            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
