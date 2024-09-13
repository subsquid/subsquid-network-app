import React from 'react';

import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useUnstakeGateway } from '@api/contracts/gateway-registration/useUnstakeGateway';
import { useMyGatewayStake } from '@api/subsquid-network-squid/gateways-graphql';

export const stakeSchema = yup.object({
  source: yup.string().label('Source').trim().required('Source is required'),
  // amount: yup
  //   .number()
  //   .label('Amount')
  //   .moreThan(0)
  //   .required('Amount is required')
  //   .max(yup.ref('max'), ({ max }) => `Amount should be less than ${formatSqd(max)} `),
});

export function GatewayUnstake() {
  const { data, isLoading: isStakeLoading } = useMyGatewayStake();

  const navigate = useNavigate();
  const { unstakeFromGateway, isLoading } = useUnstakeGateway();

  return (
    <>
      <LoadingButton
        disabled={!data?.stake?.amount || !!data?.stake?.locked || isStakeLoading}
        loading={isLoading}
        variant="contained"
        color="error"
        onClick={async e => {
          e.stopPropagation();

          if (!data?.stake) return;

          const { failedReason } = await unstakeFromGateway({ operator: data.stake });

          if (!failedReason) {
            navigate('/portals');
          }
        }}
      >
        UNLOCK
      </LoadingButton>
    </>
  );
}
