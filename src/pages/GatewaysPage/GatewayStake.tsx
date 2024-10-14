import { useMemo, useState } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, toSqd, unwrapMulticallResult } from '@lib/network/utils';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Chip, Stack } from '@mui/material';
import * as yup from '@schema';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { useClient, useReadContracts } from 'wagmi';

import {
  gatewayRegistryAbi,
  useReadNetworkControllerWorkerEpochLength,
  useReadRouterNetworkController,
} from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType } from '@api/subsquid-network-squid';
import { useMyGatewayStake } from '@api/subsquid-network-squid/gateways-graphql';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { useMySourceOptions } from '@components/SourceWallet/useMySourceOptions';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';

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

export function GatewayStakeButton({
  stake,
  disabled,
}: {
  stake?: { amount: bigint; duration: bigint };
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LoadingButton
        loading={open}
        startIcon={<LockIcon />}
        onClick={() => setOpen(true)}
        variant="contained"
        color="info"
        disabled={disabled}
      >
        LOCK
      </LoadingButton>
      <GatewayStakeDialog stake={stake} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function GatewayStakeDialog({
  stake,
  open,
  onClose,
}: {
  stake?: { amount: bigint; duration: bigint };
  open: boolean;
  onClose: () => void;
}) {
  const client = useClient();
  const { address } = useAccount();
  const { GATEWAY_REGISTRATION, ROUTER } = useContracts();
  const { setWaitHeight } = useSquidHeight();

  const networkController = useReadRouterNetworkController({
    address: ROUTER,
  });
  const workerEpochLength = useReadNetworkControllerWorkerEpochLength({
    address: networkController.data,
  });

  // const myGatewaysStake = useMyGatewayStake();
  const gatewayRegistryContract = useWriteSQDTransaction();
  const { sources, isPending: isSourcesLoading } = useMySourceOptions({ enabled: open });

  const { data: lastBlockInfo, isLoading: isLastBlockInfoLoading } = useMyGatewayStake();

  const options = useMemo(() => {
    return sources.map(source => {
      return {
        label: <SourceWalletOption source={source} />,
        value: source.id,
        disabled: source.balance === '0' || source.type !== AccountType.User,
        max: fromSqd(source.balance).toString(),
      };
    });
  }, [sources]);

  const isLoading = isSourcesLoading || isLastBlockInfoLoading;

  const initialValues = useMemo(() => {
    const option = options.find(option => !option.disabled) || options?.[0];

    return {
      source: option?.value || '',
      amount: '0',
      max: option?.max || '0',
      durationBlocks: (stake?.duration || MIN_BLOCKS_LOCK).toString(),
    };
  }, [options, stake?.duration]);

  const formik = useFormik({
    initialValues,
    validationSchema: stakeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: async values => {
      if (!address || !client) return;

      try {
        const castedValues = stakeSchema.cast(values);

        const amount = BigInt(toSqd(castedValues.amount));

        const functionData = {
          abi: gatewayRegistryAbi,
          address: GATEWAY_REGISTRATION,
          approve: amount,
        };

        const receipt = await gatewayRegistryContract.writeTransactionAsync(
          (stake?.amount || 0n) > 0n
            ? {
                ...functionData,
                functionName: 'addStake',
                args: [amount],
              }
            : {
                ...functionData,
                functionName: 'stake',
                args: [amount, BigInt(castedValues.durationBlocks), false],
              },
        );
        setWaitHeight(receipt.blockNumber, []);

        onClose();
      } catch (e: unknown) {
        toast.custom(<Alert color="error">{errorMessage(e)}</Alert>);
      }
    },
  });

  const [debouncedValues] = useDebounce(stakeSchema.cast(formik.values), 500);

  const newContractValues = useReadContracts({
    contracts: [
      {
        address: GATEWAY_REGISTRATION,
        abi: gatewayRegistryAbi,
        functionName: 'computationUnitsAmount',
        args: [
          (stake?.amount || 0n) + BigInt(toSqd(debouncedValues.amount)),
          BigInt(debouncedValues.durationBlocks),
        ],
      },
    ],
    query: {
      select: res => {
        if (!res) return;

        return {
          computationUnitsAmount: unwrapMulticallResult(res[0]) || 0n,
        };
      },
    },
  });

  const preview = useMemo(() => {
    if (!newContractValues.data || !lastBlockInfo) return;

    const workerEpochLengthValue = workerEpochLength.data || 0n;

    const epochCount = Math.ceil(debouncedValues.durationBlocks / Number(workerEpochLengthValue));

    const cuPerEpoch = Number(
      epochCount <= 1
        ? newContractValues.data.computationUnitsAmount
        : (newContractValues.data.computationUnitsAmount * workerEpochLengthValue) /
            BigInt(debouncedValues.durationBlocks),
    );

    const unlockAt =
      (Number(debouncedValues.durationBlocks) + 1) * 12_000 +
      new Date(lastBlockInfo.lastBlockTimestampL1).getTime();

    const totalAmount = new BigNumber(stake?.amount.toString() || 0)
      .plus(toSqd(debouncedValues.amount))
      .toString();

    return {
      epochCount,
      cuPerEpoch,
      unlockAt,
      totalAmount,
      isPending: newContractValues.isPending,
    };
  }, [
    debouncedValues.amount,
    debouncedValues.durationBlocks,
    lastBlockInfo,
    newContractValues.data,
    newContractValues.isPending,
    stake?.amount,
    workerEpochLength.data,
  ]);

  return (
    <ContractCallDialog
      title="Lock"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();

        formik.handleSubmit();
      }}
      disableConfirmButton={!formik.isValid}
      loading={gatewayRegistryContract.isPending}
      confirmButtonText="Lock"
    >
      {isLoading ? (
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
                const wallet = options.find(w => w?.value === e.target.value);
                if (!wallet) return;

                formik.setFieldValue('source', wallet.value);
                formik.setFieldValue('max', wallet.max);
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
                        amount: formik.values.max || '0',
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
              disabled={!!stake?.amount}
            />
          </FormRow>
          {/* <FormRow>
            <FormikSwitch id="autoExtension" label="Auto extension" formik={formik} />
          </FormRow> */}
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Total amount</Box>
              {tokenFormatter(fromSqd(preview?.totalAmount), 'SQD', 6)}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Epoch count</Box>
              {numberWithCommasFormatter(preview?.epochCount)}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Expected CU</Box>
              {numberWithCommasFormatter(preview?.cuPerEpoch)}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <Box>Unlock at</Box>
              <HelpTooltip title="Automatically relocked if auto extension is enabled">
                <span>~{dateFormat(preview?.unlockAt, 'dateTime')}</span>
              </HelpTooltip>
            </Stack>
          </Stack>
        </Form>
      )}
    </ContractCallDialog>
  );
}
