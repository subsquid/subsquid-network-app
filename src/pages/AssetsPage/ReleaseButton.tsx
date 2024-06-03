import React, { useState } from 'react';

import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { formatSqd, fromSqd } from '@api/contracts/utils';
import { useVestingContract, useVestingContractRelease } from '@api/contracts/vesting';
import { SourceWallet } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form } from '@components/Form';
import { Loader } from '@components/Loader';
import { TableList } from '@components/Table/TableList';
import { useContracts } from '@network/useContracts';

import { SourceWalletName } from './VestingName';

export const claimSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
});

export function ReleaseButton({
  vesting,
  disabled,
}: {
  vesting: SourceWallet;
  disabled?: boolean;
}) {
  const { release, error, isLoading } = useVestingContractRelease();
  const { data, isLoading: isVestingLoading } = useVestingContract({
    address: vesting.id as `0x${string}`,
  });
  const { SQD_TOKEN } = useContracts();

  const formik = useFormik({
    initialValues: {
      source: vesting.id,
      amount: 0,
    },
    validationSchema: claimSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async () => {
      const { failedReason } = await release({
        address: vesting.id as `0x${string}`,
      });

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
            <TableList>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <SourceWalletName source={vesting} />
                  </TableCell>
                  <TableCell>Vesting</TableCell>
                  <TableCell align="right">{formatSqd(SQD_TOKEN, data?.releasable, 8)}</TableCell>
                </TableRow>
              </TableBody>
            </TableList>

            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
