import { useAccount as useOriginalAccount } from 'wagmi';

export function useAccount() {
  const { address, isConnected, connector } = useOriginalAccount();

  return {
    address: address?.toLowerCase() as `0x${string}` | undefined,
    isConnected,
    connector,
  };
}
