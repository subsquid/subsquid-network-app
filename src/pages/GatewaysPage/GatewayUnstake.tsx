import React, { useMemo, useState } from 'react';

import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useUnstakeGateway } from '@api/contracts/gateway-registration/useUnstakeGateway';
import {
  AccountType,
  GatewayStakeFragmentFragment,
  useMySources,
} from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';

export const stakeSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
  // amount: yup
  //   .number()
  //   .label('Amount')
  //   .moreThan(0)
  //   .required('Amount is required')
  //   .max(yup.ref('max'), ({ max }) => `Amount should be less than ${formatSqd(max)} `),
});

export function GatewayUnstake({ operator }: { operator?: GatewayStakeFragmentFragment }) {
  const { unstakeFromGateway, error, isLoading } = useUnstakeGateway();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { sources, isPending: isSourceLoading } = useMySources({
    enabled: open,
  });

  const options = useMemo(() => {
    return [
      {
        label: (
          <SourceWalletOption
            source={{
              id: operator?.account.id || '',
              type: operator?.account.type || AccountType.User,
              balance: operator?.stake?.amount || '0',
            }}
          />
        ),
        value: operator?.account.id || '',
      },
    ];
  }, [operator]);

  const formik = useFormik({
    initialValues: {
      source: operator?.account.id,
    },
    validationSchema: stakeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet || !operator) return;

      const { failedReason } = await unstakeFromGateway({ operator });

      if (!failedReason) {
        handleClose();
      }
    },
  });

  return (
    <>
      <Button
        disabled={
          (!operator?.stake && !operator?.pendingStake) ||
          operator.stake?.locked ||
          operator.pendingStake?.locked
        }
        variant="contained"
        color="error"
        onClick={handleOpen}
      >
        Unlock
      </Button>
      <ContractCallDialog
        title="Unlock"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isLoading}
        confirmColor="error"
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
                disabled
                formik={formik}
              />
            </FormRow>
            {/*<FormRow>*/}
            {/*  <FormikTextInput*/}
            {/*    id="amount"*/}
            {/*    label="Amount"*/}
            {/*    formik={formik}*/}
            {/*    showErrorOnlyOfTouched*/}
            {/*    InputProps={{*/}
            {/*      endAdornment: (*/}
            {/*        <Chip*/}
            {/*          clickable*/}
            {/*          disabled={totalStaked === formik.values.amount}*/}
            {/*          onClick={() => {*/}
            {/*            formik.setValues({*/}
            {/*              ...formik.values,*/}
            {/*              amount: fromSqd(gateway.totalStaked).toNumber(),*/}
            {/*            });*/}
            {/*          }}*/}
            {/*          label="Max"*/}
            {/*        />*/}
            {/*      ),*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</FormRow>*/}
            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
