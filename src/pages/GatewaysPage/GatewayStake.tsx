import { useMemo, useState } from 'react';

import { dateFormat } from '@i18n';
import { numberWithCommasFormatter, tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd, getBlockTime, toSqd, unwrapMulticallResult } from '@lib/network/utils';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Chip, InputAdornment, Stack, SxProps } from '@mui/material';
import * as yup from '@schema';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useDebounce } from 'use-debounce';
import { useBlock, useReadContracts } from 'wagmi';

import {
  gatewayRegistryAbi,
  useReadGatewayRegistryMinStake,
  useReadNetworkControllerWorkerEpochLength,
  useReadRouterNetworkController,
} from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import { AccountType, SourceWalletWithBalance } from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormDivider, FormikSelect, FormikTextInput, FormRow } from '@components/Form';
import { HelpTooltip } from '@components/HelpTooltip';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useContracts } from '@network/useContracts';

export type SourceWalletWithStake = SourceWalletWithBalance & {
  stake: {
    amount: bigint;
    duration: bigint;
  };
};

const MIN_BLOCKS_LOCK = 1000;

export const stakeSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
  amount: yup
    .decimal()
    .label('Amount')
    .required()
    .positive()
    .max(yup.ref('max'))
    .min(yup.ref('min'))
    .typeError('${path} is invalid'),
  max: yup.string().label('Max').required().typeError('${path} is invalid'),
  min: yup.string().label('Min').required().typeError('${path} is invalid'),
  autoExtension: yup.boolean().label('Auto extend').default(true),
  durationBlocks: yup
    .number()
    .label('Locked blocks duration')
    .min(MIN_BLOCKS_LOCK, ({ min }) => `Tokens must be locked at least ${min} blocks`)
    .required('Lock min blocks is required'),
});

export function GatewayStakeButton({
  sx,
  disabled,
  sources,
}: {
  sx?: SxProps;
  disabled?: boolean;
  sources?: SourceWalletWithStake[];
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
        sx={sx}
      >
        LOCK
      </LoadingButton>
      <GatewayStakeDialog open={open} onClose={() => setOpen(false)} sources={sources} />
    </>
  );
}

export function GatewayStakeDialog({
  open,
  onClose,
  sources,
}: {
  open: boolean;
  onClose: () => void;
  sources?: SourceWalletWithStake[];
}) {
  const { setWaitHeight } = useSquidHeight();

  const { GATEWAY_REGISTRATION, ROUTER, CHAIN_ID_L1 } = useContracts();

  const { data: networkController, isLoading: isNetworkControllerLoading } =
    useReadRouterNetworkController({
      address: ROUTER,
    });
  const { data: workerEpochLength, isLoading: isWorkerEpochLengthLoading } =
    useReadNetworkControllerWorkerEpochLength({
      address: networkController,
    });
  const { data: minStake, isLoading: isMinStakeLoading } = useReadGatewayRegistryMinStake({
    address: GATEWAY_REGISTRATION,
  });

  // const myGatewaysStake = useMyGatewayStake();
  const gatewayRegistryContract = useWriteSQDTransaction();

  const { data: lastL1Block, isLoading: isLastL1BlockLoading } = useBlock({
    chainId: CHAIN_ID_L1,
  });

  const isLoading =
    isLastL1BlockLoading ||
    isNetworkControllerLoading ||
    isWorkerEpochLengthLoading ||
    isMinStakeLoading;

  const isSourceDisabled = (source: SourceWalletWithBalance) =>
    source.balance === '0' || source.type === AccountType.Vesting;
  const hasAvailableSource = useMemo(() => !!sources?.some(s => !isSourceDisabled(s)), [sources]);

  const initialValues = useMemo(() => {
    const source = sources?.find(s => !isSourceDisabled(s)) || sources?.[0];

    return {
      source: source?.id || '0x',
      amount: !!source?.stake.amount ? '0' : fromSqd(minStake).toFixed() || '0',
      max: fromSqd(source?.balance)?.toFixed() || '0',
      min: fromSqd(minStake)?.toFixed() || '0',
      durationBlocks: (source?.stake.duration || MIN_BLOCKS_LOCK).toString(),
    };
  }, [sources, minStake]);

  const formik = useFormik({
    initialValues,
    validationSchema: stakeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: async values => {
      try {
        const { amount, durationBlocks, source: sourceId } = stakeSchema.cast(values);

        const source = sources?.find(s => s.id === sourceId);
        if (!source) return;

        const sqdAmount = BigInt(toSqd(amount));

        const functionData = {
          abi: gatewayRegistryAbi,
          address: GATEWAY_REGISTRATION,
          approve: sqdAmount,
        };

        const receipt = await gatewayRegistryContract.writeTransactionAsync(
          source.stake.amount > 0n
            ? {
                ...functionData,
                functionName: 'addStake',
                args: [sqdAmount],
              }
            : {
                ...functionData,
                functionName: 'stake',
                args: [sqdAmount, BigInt(durationBlocks), false],
              },
        );
        setWaitHeight(receipt.blockNumber, []);

        onClose();
      } catch (e: unknown) {
        toast.error(errorMessage(e));
      }
    },
  });

  const selectedSource = useMemo(
    () => sources?.find(s => s.id === formik.values.source),
    [sources, formik.values.source],
  );
  const [debouncedValues] = useDebounce(stakeSchema.cast(formik.values), 500);

  const newContractValues = useReadContracts({
    contracts: [
      {
        address: GATEWAY_REGISTRATION,
        abi: gatewayRegistryAbi,
        functionName: 'computationUnitsAmount',
        args: [
          (selectedSource?.stake.amount || 0n) + BigInt(toSqd(debouncedValues.amount)),
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
    if (!newContractValues.data || !lastL1Block || !selectedSource) return;

    const workerEpochLengthValue = workerEpochLength || 0n;

    const epochCount = Math.ceil(debouncedValues.durationBlocks / Number(workerEpochLengthValue));

    const cuPerEpoch = Number(
      epochCount <= 1
        ? newContractValues.data.computationUnitsAmount
        : (newContractValues.data.computationUnitsAmount * workerEpochLengthValue) /
            BigInt(debouncedValues.durationBlocks),
    );

    const unlockAt =
      Number(lastL1Block.timestamp) * 1000 + getBlockTime(debouncedValues.durationBlocks);

    const totalAmount = new BigNumber(selectedSource.stake.amount.toString())
      .plus(toSqd(debouncedValues.amount))
      .toString();

    return {
      epochCount,
      cuPerEpoch,
      unlockAt,
      totalAmount,
    };
  }, [
    debouncedValues.amount,
    debouncedValues.durationBlocks,
    lastL1Block,
    newContractValues.data,
    selectedSource,
    workerEpochLength,
  ]);

  return (
    <ContractCallDialog
      title="Lock"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();

        formik.handleSubmit();
      }}
      disableConfirmButton={!formik.isValid || isLoading || !hasAvailableSource}
      loading={gatewayRegistryContract.isPending}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              id="source"
              showErrorOnlyOfTouched
              options={
                sources?.map(source => {
                  return {
                    label: <SourceWalletOption source={source} />,
                    value: source.id,
                    disabled: source.balance === '0' || source.type !== AccountType.User,
                    max: fromSqd(source.balance).toString(),
                  };
                }) || []
              }
              formik={formik}
              onChange={e => {
                const wallet = sources?.find(w => w?.id === e.target.value);
                if (!wallet) return;

                formik.setFieldValue('source', wallet.id);
                formik.setFieldValue('max', fromSqd(wallet.balance).toString());
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
                  <InputAdornment position="end">
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
                  </InputAdornment>
                ),
              }}
            />
          </FormRow>
          <FormRow>
            <FormikTextInput
              id="durationBlocks"
              label={
                // TODO: add tooltip text
                <HelpTooltip title="Lorem ipsum dolor">
                  <span>Duration</span>
                </HelpTooltip>
              }
              formik={formik}
              showErrorOnlyOfTouched
              autoComplete="off"
              disabled={!!selectedSource?.stake.amount}
            />
          </FormRow>
          {/* <FormRow>
            <FormikSwitch id="autoExtension" label="Auto extension" formik={formik} />
          </FormRow> */}
          <FormDivider />
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
              <HelpTooltip title="Lorem ipsum dolor">
                <span>Available CUs</span>
              </HelpTooltip>
              {numberWithCommasFormatter(preview?.cuPerEpoch)}
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignContent="center">
              <HelpTooltip title="Automatically relocked if auto extension is enabled">
                <span>Unlocked at</span>
              </HelpTooltip>
              <span>~{dateFormat(preview?.unlockAt, 'dateTime')}</span>
            </Stack>
          </Stack>
        </Form>
      )}
    </ContractCallDialog>
  );
}
