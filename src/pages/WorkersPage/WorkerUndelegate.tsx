import React, { useEffect, useMemo, useState } from 'react';

import { Button, Chip } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useWorkerUndelegate } from '@api/contracts/staking';
import { formatSqd, humanReadableSqd, toSqd } from '@api/contracts/utils';
import { BlockchainApiWorker } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { SourceWalletOption } from '@components/SourceWallet';
import { useContracts } from '@network/useContracts';

export const undelegateSchema = (SQD_TOKEN: string) =>
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
    max: yup.string().label('Max').required('Max is required'),
  });

export function WorkerUndelegate({
  worker,
  disabled,
}: {
  worker?: BlockchainApiWorker;
  disabled?: boolean;
}) {
  const { undelegateFromWorker, error, isLoading } = useWorkerUndelegate();
  const { SQD_TOKEN } = useContracts();

  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.UIEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const options = useMemo(
    () =>
      (worker?.myDelegations || [])
        .filter(s => !new Decimal(s.deposit).isZero())
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
      amount: '0',
      max: '0',
    },
    validationSchema: undelegateSchema(SQD_TOKEN),
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

  useEffect(() => {
    if (formik.values.source) return;

    const source = worker?.myDelegations.filter(s => !new Decimal(s.deposit).isZero())?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.owner.id,
      max: humanReadableSqd(source.deposit),
    });
  }, [formik, worker?.myDelegations]);

  return (
    <>
      <Button
        disabled={
          disabled ||
          worker?.myDelegationsTotal.equals(0) ||
          !worker?.myDelegations.some(w => !w.locked)
        }
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
                formik.setFieldValue('max', humanReadableSqd(wallet.deposit));
              }}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput
              showErrorOnlyOfTouched
              id="amount"
              label="Amount"
              formik={formik}
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
      </ContractCallDialog>
    </>
  );
}
