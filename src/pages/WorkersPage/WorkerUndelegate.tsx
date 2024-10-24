import React, { useMemo, useState } from 'react';

import { dateFormat, relativeDateFormat } from '@i18n';
import { percentFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd } from '@lib/network';
import { Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, Stack, Tooltip } from '@mui/material';
import * as yup from '@schema';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

import { stakingAbi, useReadRouterStaking } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType, SourceWalletWithBalance, Worker } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormDivider, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { SourceWalletOption } from '@components/SourceWallet';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

import { EXPECTED_APR_TIP, useExpectedAprAfterDelegation } from './WorkerDelegate';

export type SourceWalletWithDelegation = SourceWalletWithBalance & {
  locked: boolean;
  unlockedAt?: string;
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
  worker?: Pick<Worker, 'id'>;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const isSourceDisabled = (source: SourceWalletWithDelegation) =>
    source.balance === '0' || source.locked;

  const isLocked = useMemo(() => !!sources?.length && !sources?.some(d => !d.locked), [sources]);

  const [curTimestamp] = useDebounce(Date.now(), 1000);
  const { unlockedAt, timeLeft } = useMemo(() => {
    const min = sources?.reduce(
      (r, d) => {
        if (!d.unlockedAt) return r;

        const ms = new Date(d.unlockedAt).getTime();
        return !r || ms < r ? ms : r;
      },
      undefined as number | undefined,
    );

    return {
      unlockedAt: min ? new Date(min).toISOString() : undefined,
      timeLeft: min ? relativeDateFormat(curTimestamp, min) : undefined,
    };
  }, [curTimestamp, sources]);

  return (
    <>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        {isLocked && (
          <Tooltip
            title={unlockedAt && `Unlocks in ${timeLeft} (${dateFormat(unlockedAt, 'dateTime')})`}
            placement="top"
          >
            <Lock
              fontSize="small"
              sx={{
                color: '#3e4a5c',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
            />
          </Tooltip>
        )}
        <LoadingButton
          loading={open}
          onClick={() => setOpen(true)}
          variant="outlined"
          color="error"
          disabled={disabled || isLocked}
        >
          UNDELEGATE
        </LoadingButton>
      </Box>
      <WorkerUndelegateDialog
        open={open}
        onClose={() => setOpen(false)}
        worker={worker}
        sources={sources}
        isSourceDisabled={isSourceDisabled}
      />
    </>
  );
}

function WorkerUndelegateDialog({
  open,
  onClose,
  worker,
  sources,
  isSourceDisabled,
}: {
  open: boolean;
  onClose: () => void;
  worker?: Pick<Worker, 'id'>;
  sources?: SourceWalletWithDelegation[];
  isSourceDisabled: (source: SourceWalletWithDelegation) => boolean;
}) {
  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const { writeTransactionAsync, isPending } = useWriteSQDTransaction();

  const stakingAddress = useReadRouterStaking({
    address: contracts.ROUTER,
  });

  const initialValues = useMemo(() => {
    const source = sources?.find(c => !isSourceDisabled(c)) || sources?.[0];

    return {
      source: source?.id || '',
      amount: '0',
      max: fromSqd(source?.balance).toString(),
    };
  }, [sources, isSourceDisabled]);

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

        onClose();
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

  return (
    <ContractCallDialog
      title="Undelegate worker"
      open={open}
      loading={isPending}
      onResult={confirmed => {
        if (!confirmed) return onClose();

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
              const wallet = sources?.find(s => s.id === e.target.value);
              if (!wallet) return;

              formik.setFieldValue('source', wallet.id);
              formik.setFieldValue('max', fromSqd(wallet.balance).toFixed());
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
  );
}
