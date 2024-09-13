export const REWARD_TREASURY_CONTRACT_ABI = [
  {
    type: 'function',
    name: 'claimFor',
    inputs: [
      {
        name: 'rewardDistribution',
        type: 'address',
        internalType: 'contract IRewardsDistribution',
      },
      {
        name: 'receiver',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;
