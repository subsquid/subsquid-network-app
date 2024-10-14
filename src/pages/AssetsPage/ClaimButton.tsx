import { useMemo, useState } from 'react';

import { tokenFormatter } from '@lib/formatters/formatters';
import { fromSqd } from '@lib/network/utils';
import { TollOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useClient } from 'wagmi';
import * as yup from 'yup';

import { rewardTreasuryAbi, useReadRouterRewardTreasury } from '@api/contracts';
import { useWriteSQDTransaction } from '@api/contracts/useWriteTransaction';
import { errorMessage } from '@api/contracts/utils';
import {
  AccountType,
  ClaimType,
  useAccountQuery,
  useMyClaimsQuery,
  useSquid,
  Worker,
} from '@api/subsquid-network-squid';
import { ContractCallDialog } from '@components/ContractCallDialog';
import { Form, FormikSelect, FormRow } from '@components/Form';
import { Loader } from '@components/Loader';
import { SourceWalletOption } from '@components/SourceWallet';
import { TableList } from '@components/Table/TableList.tsx';
import { useSquidHeight } from '@hooks/useSquidNetworkHeightHooks';
import { useAccount } from '@network/useAccount';
import { useContracts } from '@network/useContracts';
import { WorkerName } from '@pages/WorkersPage/WorkerName';

export const claimSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
});

export function ClaimButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LoadingButton
        startIcon={<TollOutlined />}
        onClick={() => setOpen(true)}
        color="info"
        variant="contained"
        loading={open}
      >
        CLAIM
      </LoadingButton>
      <ClaimDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function ClaimDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const client = useClient();
  const account = useAccount();
  const squid = useSquid();

  const { setWaitHeight } = useSquidHeight();

  const contracts = useContracts();
  const contractWriter = useWriteSQDTransaction({});

  const rewardTreasuryAddress = useReadRouterRewardTreasury({
    address: contracts.ROUTER,
  });

  const accountQuery = useAccountQuery(
    squid,
    { address: account.address || '0x' },
    { enabled: open },
  );
  const claimsQuery = useMyClaimsQuery(
    squid,
    { address: account.address || '0x' },
    { enabled: open },
  );

  const isLoading =
    accountQuery.isLoading || claimsQuery.isLoading || rewardTreasuryAddress.isLoading;

  const sources = useMemo(() => {
    if (!accountQuery.data?.accountById) return [];

    return [accountQuery.data.accountById, ...accountQuery.data.accountById.owned].map(s => {
      const claims: (Pick<Worker, 'id' | 'peerId' | 'name'> & {
        type: ClaimType;
        claimableReward: string;
      })[] = [];

      claimsQuery.data?.delegations.forEach(d => {
        if (d.owner.id !== s.id) return;

        claims.push({
          id: d.worker.id,
          peerId: d.worker.peerId,
          name: d.worker.name,
          claimableReward: d.claimableReward,
          type: ClaimType.Delegation,
        });
      });

      claimsQuery.data?.workers.forEach(w => {
        if (w.owner.id !== s.id) return;

        claims.push({
          id: w.id,
          peerId: w.peerId,
          name: w.name,
          claimableReward: w.claimableReward,
          type: ClaimType.Worker,
        });
      });

      const totalClaimableBalance = claims.reduce(
        (t, i) => t.plus(i.claimableReward),
        BigNumber(0),
      );

      return {
        id: s.id,
        type: s.type,
        claims: claims.sort(
          (a, b) => BigNumber(a.claimableReward).comparedTo(b.claimableReward) * -1,
        ),
        totalClaimableBalance: totalClaimableBalance.toString(),
        disabled: totalClaimableBalance.lte(0),
      };
    });
  }, [accountQuery.data?.accountById, claimsQuery.data?.delegations, claimsQuery.data?.workers]);

  const initialValues = useMemo(() => {
    const option = sources.find(c => !c.disabled) || sources?.[0];

    return {
      source: option?.id || '',
    };
  }, [sources]);

  const formik = useFormik({
    initialValues,
    validationSchema: claimSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,

    onSubmit: async values => {
      if (!client) return;
      if (!account.address) return;
      if (!rewardTreasuryAddress.data) return;

      try {
        const { source } = claimSchema.cast(values);

        const wallet = sources.find(w => w?.id === source);
        if (!wallet) return;

        const receipt = await contractWriter.writeTransactionAsync({
          address: rewardTreasuryAddress.data,
          abi: rewardTreasuryAbi,
          functionName: 'claimFor',
          args: [contracts.REWARD_DISTRIBUTION, account.address],
          vesting: wallet.type === AccountType.Vesting ? (wallet.id as `0x${string}`) : undefined,
        });
        setWaitHeight(receipt.blockNumber, []);

        onClose();
      } catch (e: unknown) {
        toast.error(errorMessage(e));
      }
    },
  });

  return (
    <ContractCallDialog
      title="Claim"
      open={open}
      onResult={confirmed => {
        if (!confirmed) return onClose();

        formik.handleSubmit();
      }}
      loading={contractWriter.isPending}
      confirmColor="info"
      disableConfirmButton={!formik.isValid}
      confirmButtonText="Claim"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <FormRow>
            <FormikSelect
              id="source"
              showErrorOnlyOfTouched
              options={sources.map(s => ({
                label: (
                  <SourceWalletOption
                    source={{ ...s, balance: s.totalClaimableBalance.toString() }}
                  />
                ),
                value: s.id,
                disabled: s.disabled,
              }))}
              formik={formik}
              onChange={e => {
                const source = sources.find(s => s.id === e.target.value);
                if (!source) return;

                formik.setFieldValue('source', source.id);
              }}
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
                {sources
                  .find(s => s.id === formik.values.source)
                  ?.claims.map(w => {
                    return (
                      <TableRow key={w.id}>
                        <TableCell>
                          <WorkerName worker={w} />
                        </TableCell>
                        <TableCell>
                          {w.type === ClaimType.Worker ? 'Worker reward' : 'Delegation reward'}
                        </TableCell>
                        <TableCell align="right">
                          {tokenFormatter(fromSqd(w.claimableReward), contracts.SQD_TOKEN)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </TableList>
          </Box>
        </Form>
      )}
    </ContractCallDialog>
  );
}
