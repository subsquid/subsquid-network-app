import React, { useState } from 'react';

import { addressFormatter } from '@lib/formatters/formatters';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { fromSqd } from '@api/contracts/utils';
import { useVestingContract, useVestingContractRelease } from '@api/contracts/vesting';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';

export const claimSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
});

export function ReleaseButton({
  vesting,
  disabled,
}: {
  vesting: { address: string };
  disabled?: boolean;
}) {
  const { release, error, isLoading } = useVestingContractRelease({
    address: vesting.address as `0x${string}`,
  });
  const { data, isLoading: isVestingLoading } = useVestingContract({
    address: vesting.address as `0x${string}`,
  });

  const formik = useFormik({
    initialValues: {
      source: vesting.address,
      amount: 0,
    },
    validationSchema: claimSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async () => {
      const { failedReason } = await release();

      if (!failedReason) {
        handleClose();
      }
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = (e: React.UIEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        disabled={disabled || fromSqd(data?.releasable).lessThanOrEqualTo(0)}
      >
        Release
      </Button>
      <ContractCallDialog
        title="Release"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isLoading}
      >
        {isVestingLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <FormRow>
              <FormikSelect
                id="source"
                showErrorOnlyOfTouched
                options={[{ label: addressFormatter(vesting.address), value: vesting.address }]}
                formik={formik}
                disabled={true}
              />
            </FormRow>

            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
