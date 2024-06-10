import React, { useEffect, useMemo, useState } from 'react';

import { percentFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd } from '@lib/network';
import { Box, Button, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useDebounce } from 'use-debounce';

import { useWorkerUndelegate } from '@api/contracts/staking';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { SourceWalletOption } from '@components/SourceWallet';

import { EXPECTED_APR_TIP, useExpectedAprAfterDelegation } from './WorkerDelegate';

export const undelegateSchema = yup.object({
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

export function WorkerUndelegate({
  worker,
  disabled,
}: {
  worker?: BlockchainApiWorker;
  disabled?: boolean;
}) {
  const { undelegateFromWorker, error, isLoading } = useWorkerUndelegate();

  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.UIEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const options = useMemo(
    () =>
      (worker?.myDelegations || [])
        .filter(s => !BigNumber(s.deposit).isZero())
        .map(s => {
          return {
            label: (
              <SourceWalletOption
                source={{
                  id: s.owner.id,
                  balance: s.deposit,
                  type: s.owner.type,
                }}
              />
            ),
            value: s.owner.id,
          };
        }),
    [worker?.myDelegations],
  );

  const formik = useFormik({
    initialValues: {
      source: '',
      amount: '',
      max: '0',
    },
    validationSchema: undelegateSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = worker?.myDelegations.find(w => w?.owner.id === values.source);
      if (!wallet || !worker) return;

      const { failedReason } = await undelegateFromWorker({
        worker,
        amount: toSqd(values.amount),
        wallet: {
          id: wallet.owner.id,
          type: wallet.owner.type,
        },
      });
      if (!failedReason) {
        handleClose();
      }
    },
  });

  const [delegation] = useDebounce(formik.values.amount, 500);
  const { isPending: isExpectedAprPending, stakerApr } = useExpectedAprAfterDelegation({
    workerId: worker?.id,
    amount: '-' + toSqd(delegation),
    enabled: open && !!worker,
  });

  useEffect(() => {
    if (formik.values.source) return;

    const source = worker?.myDelegations.filter(s => !BigNumber(s.deposit).isZero())?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.owner.id,
      max: fromSqd(source.deposit).toFixed(),
    });
  }, [formik, worker?.myDelegations]);

  const canUndelegate = useMemo(() => {
    return !!worker?.myDelegations.some(d => !d.locked && BigNumber(d.deposit).gt(0));
  }, [worker?.myDelegations]);

  return (
    <>
      <Button
        disabled={disabled || !canUndelegate}
        color="error"
        onClick={handleOpen}
        variant="contained"
      >
        Undelegate
      </Button>
      <ContractCallDialog
        title="Undelegate"
        open={open}
        loading={isLoading}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        confirmColor="error"
      >
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              disabled={!options.length}
              showErrorOnlyOfTouched
              options={options}
              id="source"
              formik={formik}
              onChange={e => {
                const wallet = worker?.myDelegations.find(s => s.owner.id === e.target.value);
                if (!wallet) return;

                formik.setFieldValue('source', wallet.owner.id);
                formik.setFieldValue('max', fromSqd(wallet.deposit).toFixed());
              }}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput
              showErrorOnlyOfTouched
              id="amount"
              label="Amount"
              formik={formik}
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
            <Box>Expected APR</Box>
            <Stack direction="row">
              {isExpectedAprPending ? '-' : percentFormatter(stakerApr)}
              <HelpTooltip help={EXPECTED_APR_TIP} />
            </Stack>
          </Stack>
          <BlockchainContractError error={error} />
        </Form>
      </ContractCallDialog>
    </>
  );
}
