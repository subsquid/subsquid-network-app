import { useEffect, useMemo, useState } from 'react';

import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { LoadingButton } from '@mui/lab';
import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useClaim } from '@api/contracts/claim';
import { ClaimType, useMyClaimsAvailable, useMySources } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormRow } from '@components/Form';
import { SourceWalletOption } from '@components/SourceWallet';
import { TableList } from '@components/Table/TableList.tsx';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';

export const claimSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
});

export function ClaimButton() {
  const { SQD_TOKEN } = useContracts();
  const { claim, error, isPending } = useClaim();
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
      const wallet = claimableSources.find(w => w?.id === values.source);
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

  const { sources } = useMySources();
  const {
    claims,
    hasClaimsAvailable,
    sources: claimableSources,
    isLoading: isClaimsLoading,
    currentSourceTotalClaimsAvailable,
  } = useMyClaimsAvailable({
    source: formik.values.source,
  });

  const options = useMemo(
    () =>
      sources.map(s => {
        const claimableSource = claimableSources.find(cs => cs.id === s.id);
        return {
          label: <SourceWalletOption source={claimableSource || { ...s, balance: '0' }} />,
          value: s.id,
          disabled: fromSqd(claimableSource?.balance).eq(0),
        };
      }),
    [claimableSources, sources],
  );

  useEffect(() => {
    if (isClaimsLoading) return;
    else if (formik.values.source) return;

    const source = claimableSources?.[0];
    if (!source) return;

    formik.setValues({
      ...formik.values,
      source: source.id,
    });
  }, [formik, isClaimsLoading, claimableSources]);

  return (
    <>
      <LoadingButton
        disabled={!hasClaimsAvailable}
        onClick={handleOpen}
        color="info"
        variant="contained"
      >
        CLAIM
      </LoadingButton>
      <ContractCallDialog
        title="Claim"
        open={open}
        onResult={confirmed => {
          if (!confirmed) return handleClose();

          formik.handleSubmit();
        }}
        loading={isPending}
        confirmColor="info"
        disableConfirmButton={currentSourceTotalClaimsAvailable.lte(0)}
      >
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

          <Box
            sx={{
              scrollbarWidth: 'thin',
              maxHeight: '50vh',
              overflow: 'auto',
            }}
          >
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
                      <TableCell align="right">
                        {tokenFormatter(fromSqd(w.claimableReward), SQD_TOKEN)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </TableList>
          </Box>

          <BlockchainContractError error={error} />
        </Form>
      </ContractCallDialog>
    </>
  );
}
