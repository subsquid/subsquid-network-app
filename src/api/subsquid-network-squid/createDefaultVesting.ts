import { AccountType } from '@api/subsquid-network-squid';

export const createDefaultVesting = (index: number = 0) => ({
  id: `0x${index.toString(16).padStart(40, '0')}`,
  type: AccountType.Vesting,
  deposited: '100000000000000000000000',
  releasable: '100000000000000000000000',
  balance: '100000000000000000000000',
  released: '100000000000000000000000',
  start: Date.now(),
  end: Date.now() + 365 * 24 * 60 * 60 * 1000,
  initialRelease: 20,
  expectedTotal: '1000000000000000000000000',
  isOwn: () => false,
}); 