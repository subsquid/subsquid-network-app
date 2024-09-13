import { useReadContract } from 'wagmi';

import { useContracts } from '@network/useContracts';

import { GATEWAY_REGISTRATION_CONTRACT_ABI } from '../abi/GatewayRegistration.abi';

export function useComputationUnits({
  amount,
  lockDuration,
}: {
  amount: string;
  lockDuration: number;
}) {
  const contracts = useContracts();

  const { data, isLoading, isPending } = useReadContract({
    address: contracts.GATEWAY_REGISTRATION,
    abi: GATEWAY_REGISTRATION_CONTRACT_ABI,
    functionName: 'computationUnitsAmount',
    args: [BigInt(amount), BigInt(lockDuration)],
  });

  return {
    data: data?.toString(),
    isLoading,
    isPending,
  };
}
