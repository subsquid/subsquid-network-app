import React, { useMemo, useState } from 'react';

import { percentFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd } from '@lib/network/utils';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import { useDebounce } from 'use-debounce';

import { useCapedStakeAfterDelegation, useWorkerDelegate } from '@api/contracts/staking';
import {
  useMySources,
  useWorkerDelegationInfo,
  Worker,
  WorkerStatus,
} from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormDivider, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { SourceWalletOption } from '@components/SourceWallet';

export const EXPECTED_APR_TIP = (
  <span>
    An estimated delegation APR. The realized APR may differ significantly and depends on the worker
    uptime and the total amount of SQD delegated to the worker, which may change over time.
  </span>
);

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
  variant = 'outlined',
}: {
  worker?: Pick<Worker, 'id' | 'status'>;
  variant?: 'outlined' | 'contained';
  disabled?: boolean;
}) {
  const { delegateToWorker, error, isPending } = useWorkerDelegate();

  const [open, setOpen] = useState(false);
  const handleOpen = (event: React.UIEvent) => {
    event.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { sources, isPending: isSourceLoading } = useMySources({});

  const options = useMemo(() => {
    return sources.map(s => {
      return {
        label: <SourceWalletOption source={s} />,
        value: s.id,
        disabled: s.balance === '0',
        max: fromSqd(s.balance).toString(),
      };
    });
  }, [sources]);

  const initialValues = useMemo(() => {
    const option = options.find(c => !c.disabled) || options?.[0];

    return {
      source: option?.value || '',
      amount: '0',
      max: option?.max || '0',
    };
  }, [options]);

  const formik = useFormik({
    initialValues,
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

  const [delegation] = useDebounce(formik.values.amount, 500);
  const { isPending: isExpectedAprPending, stakerApr } = useExpectedAprAfterDelegation({
    workerId: worker?.id,
    amount: toSqd(delegation),
    enabled: open && !!worker,
  });

  return (
    <>
      <LoadingButton
        disabled={disabled || !worker || worker.status !== WorkerStatus.Active}
        onClick={handleOpen}
        variant={variant}
        color={variant === 'contained' ? 'info' : 'secondary'}
      >
        DELEGATE
      </LoadingButton>
      <ContractCallDialog
        title="Delegate"
        confirmButtonText="DELEGATE"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isPending}
      >
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              id="source"
              disabled={!options.length}
              showErrorOnlyOfTouched
              options={options}
              formik={formik}
              onChange={e => {
                const option = options.find(w => w?.value === e.target.value);
                if (!option) return;

                formik.setFieldValue('source', option.value);
                formik.setFieldValue('max', option.max);
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
          <FormDivider />
          <Stack direction="row" justifyContent="space-between" alignContent="center">
            <Box>Expected APR</Box>
            <HelpTooltip title={EXPECTED_APR_TIP}>
              <span>{isExpectedAprPending ? '-' : percentFormatter(stakerApr)}</span>
            </HelpTooltip>
          </Stack>

          <BlockchainContractError error={error} />
        </Form>
      </ContractCallDialog>
    </>
  );
}

export function useExpectedAprAfterDelegation({
  workerId,
  amount,
  enabled,
}: {
  workerId?: string;
  amount: string;
  enabled?: boolean;
}) {
  const { data: rewardStats, isLoading: isRewardStatsLoading } = useWorkerDelegationInfo({
    workerId,
    enabled,
  });

  const { data, isPending: isCapedDelegationLoading } = useCapedStakeAfterDelegation({
    workerId: workerId || '',
    amount: amount,
    enabled: enabled && !!workerId,
  });

  const expectedApr = useMemo(() => {
    if (!rewardStats) return;

    const { worker, info } = rewardStats;
    if (!worker) return;

    const totalDelegation = BigNumber(worker.totalDelegation || 0);
    const bond = BigNumber(worker.bond || 0);

    const expectedCappedDelegation = BigNumber(data.capedDelegation);

    const expectedTotalDelegation = BigNumber.max(totalDelegation.plus(amount), 0);
    const expectedUtilizedStake = BigNumber(info.utilizedStake)
      .minus(worker.capedDelegation || 0)
      .plus(expectedCappedDelegation);

    const supplyRatio = expectedCappedDelegation.plus(bond || 0).div(expectedUtilizedStake);

    const dTraffic = Math.min(
      BigNumber(worker.trafficWeight || 0)
        .div(supplyRatio)
        .toNumber() ** 0.1,
      1,
    );

    const actualYield = BigNumber(info.baseApr)
      .times(worker.liveness || 0)
      .times(dTraffic)
      .times(worker.dTenure || 0);

    const halfDelegation = expectedCappedDelegation.div(2);

    const workerReward = actualYield.times(BigNumber(bond || 0).plus(halfDelegation));
    const workerApr = workerReward
      .div(bond || 0)
      .times(100)
      .toNumber();

    const stakerReward = actualYield.times(halfDelegation);
    const stakerApr = expectedTotalDelegation.gt(0)
      ? stakerReward.div(expectedTotalDelegation).times(100).toNumber()
      : workerApr / 2;

    return {
      workerApr,
      stakerApr,
    };
  }, [amount, data.capedDelegation, rewardStats]);

  return {
    ...expectedApr,
    isPending: isCapedDelegationLoading || isRewardStatsLoading,
  };
}
