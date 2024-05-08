import React, { useMemo, useState } from 'react';

import { Button } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useUnstakeGateway } from '@api/contracts/gateway-registration/useUnstakeGateway';
import { useMySources } from '@api/subsquid-network-squid';
import { BlockchainGateway } from '@api/subsquid-network-squid/gateways-graphql';
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

export function GatewayUnstake({ gateway }: { gateway: BlockchainGateway }) {
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
              id: gateway.owner.id,
              type: gateway.owner.type,
              balance: gateway.totalStaked,
            }}
          />
        ),
        value: gateway.owner.id,
        disabled: new Decimal(gateway.totalStaked).lessThanOrEqualTo(0),
      },
    ];
  }, [gateway]);

  const formik = useFormik({
    initialValues: {
      source: gateway.owner.id,
      max: Number(gateway.totalStaked),
    },
    validationSchema: stakeSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet) return;

      const { failedReason } = await unstakeFromGateway({
        gateway,
      });

      if (!failedReason) {
        handleClose();
      }
    },
  });

  return (
    <>
      <Button
        disabled={gateway.operator?.stake?.locked || gateway.operator?.pendingStake?.locked}
        variant="contained"
        color="primary"
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
