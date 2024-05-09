import React, { useEffect, useState } from 'react';

import { Button, TableBody, TableCell, TableRow } from '@mui/material';
import Decimal from 'decimal.js';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useClaim } from '@api/contracts/claim';
import { ClaimType, useMyClaimsAvailable } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { TableList } from '@components/Table/TableList.tsx';
import { WorkerName } from '@pages/WorkersPage/WorkerName';

export const claimSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
});

export function ClaimButton() {
  const { claim, error, isLoading } = useClaim();
  const formik = useFormik({
    initialValues: {
      source: '',
      amount: 0,
      max: 0,
    },
    validationSchema: claimSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,

    onSubmit: async values => {
      const wallet = sources.find(w => w?.id === values.source);
      if (!wallet) return;

      const { failedReason } = await claim({
        wallet,
      });

      if (!failedReason) {
        handleClose();
      }
    },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    claims,
    hasClaimsAvailable,
    sources,
    isLoading: isClaimsLoading,
    currentSourceTotalClaimsAvailable,
  } = useMyClaimsAvailable({
    source: formik.values.source,
  });

  const options = sources.map(s => {
    return {
      label: <SourceWalletOption source={s} />,
      value: s.id,
    };
  });

  useEffect(() => {
    if (isClaimsLoading) return;
    else if (formik.values.source) return;

    const source = sources?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
    });
  }, [formik, isClaimsLoading, sources]);

  return (
    <>
      <Button
        disabled={!hasClaimsAvailable}
        onClick={handleOpen}
        color="success"
        variant="contained"
      >
        Claim
      </Button>
      <ContractCallDialog
        title="Claim"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isLoading}
        confirmColor="success"
        disableConfirmButton={currentSourceTotalClaimsAvailable.lessThanOrEqualTo(0)}
      >
        {isClaimsLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={formik.handleSubmit}>
            <FormRow>
              <FormikSelect
                id="source"
                disabled={!options.length}
                showErrorOnlyOfTouched
                options={options}
                formik={formik}
              />
            </FormRow>

            <TableList>
              <TableBody>
                {claims.map(w => {
                  return (
                    <TableRow key={w.id}>
                      <TableCell>
                        <WorkerName worker={w} />
                      </TableCell>
                      <TableCell>
                        {w.type === ClaimType.Worker ? 'Worker reward' : 'Delegation reward'}
                      </TableCell>
                      <TableCell align="right">{w.claimableRewardFormatted}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableList>

            <BlockchainContractError error={error} />
          </Form>
        )}
      </ContractCallDialog>
    </>
  );
}
