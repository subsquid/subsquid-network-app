import React, { useMemo, useState } from 'react';

import { percentFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd } from '@lib/network';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import { stakingAbi, useReadRouterStaking } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import {
  Account,
  AccountType,
  Delegation,
  SourceWalletWithBalance,
  Worker,
} from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormDivider, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { SourceWalletOption } from '@components/SourceWallet';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { EXPECTED_APR_TIP, useExpectedAprAfterDelegation } from './WorkerDelegate';

export type SourceWalletWithDelegation = SourceWalletWithBalance & {
  locked: boolean;
};

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
  sources,
}: {
  sources?: SourceWalletWithDelegation[];
  worker?: Pick<Worker, 'id'> & {
    delegations: (Pick<Delegation, 'deposit' | 'locked'> & {
      owner: Pick<Account, 'id' | 'type'>;
    })[];
  };
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.UIEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const { writeTransactionAsync, isPending } = useWriteSQDTransaction();

  const stakingAddress = useReadRouterStaking({
    address: contracts.ROUTER,
  });

  const isSourceDisabled = (source: SourceWalletWithDelegation) =>
    source.balance === '0' || source.locked;

  const initialValues = useMemo(() => {
    const source = sources?.find(c => !isSourceDisabled(c)) || sources?.[0];

    return {
      source: source?.id || '',
      amount: '0',
      max: fromSqd(source?.balance).toString(),
    };
  }, [sources]);

  const formik = useFormik({
    initialValues,
    validationSchema: undelegateSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: async values => {
      if (!stakingAddress.data) return;
      if (!worker) return;

      try {
        const { amount, source: sourceId } = undelegateSchema.cast(values);

        const source = sources?.find(w => w?.id === sourceId);
        if (!source) return;

        const sqdAmount = BigInt(toSqd(amount));

        const receipt = await writeTransactionAsync({
          abi: stakingAbi,
          address: stakingAddress.data,
          functionName: 'withdraw',
          args: [BigInt(worker.id), sqdAmount],
          vesting: source.type === AccountType.Vesting ? (source.id as `0x${string}`) : undefined,
        });
        setWaitHeight(receipt.blockNumber, []);

        handleClose();
      } catch (e) {
        toast.error(errorMessage(e));
      }
    },
  });

  const [delegation] = useDebounce(formik.values.amount, 500);
  const { isPending: isExpectedAprPending, stakerApr } = useExpectedAprAfterDelegation({
    workerId: worker?.id,
    amount: '-' + toSqd(delegation),
    enabled: open && !!worker,
  });

  // const source = useMemo(() => {
  //   if (!worker) return;

  //   return (
  //     (formik.values.source
  //       ? worker?.delegations.find(c => c.owner.id === formik.values.source)
  //       : worker?.delegations.find(c => fromSqd(c.deposit).gte(0))) || worker?.delegations?.[0]
  //   );
  // }, [formik.values.source, worker]);

  // const canUndelegate = useMemo(() => {
  //   return !!worker?.delegations.some(d => !d.locked && BigNumber(d.deposit).gt(0));
  // }, [worker?.delegations]);

  return (
    <>
      <LoadingButton
        loading={open}
        disabled={disabled}
        color="error"
        onClick={handleOpen}
        variant="outlined"
      >
        UNDELEGATE
      </LoadingButton>
      <ContractCallDialog
        title="Undelegate worker"
        open={open}
        loading={isPending}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        confirmColor="error"
      >
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              showErrorOnlyOfTouched
              options={
                sources?.map(s => {
                  return {
                    label: <SourceWalletOption source={s} />,
                    value: s.id,
                    disabled: isSourceDisabled(s),
                  };
                }) || []
              }
              id="source"
              formik={formik}
              onChange={e => {
                const wallet = worker?.delegations.find(s => s.owner.id === e.target.value);
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
          <FormDivider />
          <Stack direction="row" justifyContent="space-between" alignContent="center">
            <Box>Expected APR</Box>
            <HelpTooltip title={EXPECTED_APR_TIP}>
              <span>{isExpectedAprPending ? '-' : percentFormatter(stakerApr)}</span>
            </HelpTooltip>
          </Stack>
        </Form>
      </ContractCallDialog>
    </>
  );
}
