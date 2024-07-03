import React from 'react';

import { fromSqd } from '@lib/network';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';

import { useVestingContract, useVestingContractRelease } from '@api/contracts/vesting';
import { SourceWallet } from '@api/subsquid-network-squid';
import { BlockchainContractError } from '@components/BlockchainContractError';

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
  const isDisabled = isVestingLoading || fromSqd(data?.releasable).lte(0);

  return (
    <>
      <LoadingButton
        loading={isLoading}
        onClick={async e => {
          e.stopPropagation();
          await release({
            address: vesting.id as `0x${string}`,
          });
        }}
        variant="outlined"
        color="secondary"
        disabled={disabled || isDisabled}
      >
        RELEASE
      </LoadingButton>
      <BlockchainContractError error={error} />
    </>
  );
}
