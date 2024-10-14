import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { erc20Abi } from 'viem';

export default defineConfig({
  out: 'src/api/contracts/subsquid.generated.ts',
  contracts: [
    {
      name: 'SQD',
      abi: erc20Abi,
    },
    {
      name: 'Router',
      abi: [
        {
          type: 'function',
          name: 'networkController',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'contract INetworkController',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'rewardCalculation',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'contract IRewardCalculation',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'rewardTreasury',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'address',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'staking',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'contract IStaking',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'workerRegistration',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'address',
              internalType: 'contract IWorkerRegistration',
            },
          ],
          stateMutability: 'view',
        },
      ],
    },
    {
      name: 'WorkerRegistry',
      abi: [
        {
          type: 'function',
          name: 'bondAmount',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'register',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
            {
              name: 'metadata',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'updateMetadata',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
            {
              name: 'metadata',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          inputs: [
            {
              internalType: 'bytes',
              name: 'peerId',
              type: 'bytes',
            },
          ],
          name: 'deregister',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },

        {
          type: 'function',
          name: 'withdraw',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
      ],
    },
    {
      name: 'Staking',
      abi: [
        {
          type: 'function',
          name: 'deposit',
          inputs: [
            {
              name: 'worker',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'withdraw',
          inputs: [
            {
              type: 'uint256',
              name: 'worker',
            },
            {
              type: 'uint256',
              name: 'amount',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'claimable',
          inputs: [
            {
              name: 'staker',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'delegated',
          inputs: [
            {
              name: 'worker',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
      ],
    },
    {
      name: 'Vesting',
      abi: [
        {
          type: 'function',
          name: 'depositedIntoProtocol',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'duration',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'end',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'execute',
          inputs: [
            {
              name: 'to',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'data',
              type: 'bytes',
              internalType: 'bytes',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'execute',
          inputs: [
            {
              name: 'to',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'data',
              type: 'bytes',
              internalType: 'bytes',
            },
            {
              name: 'requiredApprove',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'bytes',
              internalType: 'bytes',
            },
          ],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'expectedTotalAmount',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'immediateReleaseBIP',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'releasable',
          inputs: [
            {
              name: 'token',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'releasable',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'release',
          inputs: [
            {
              name: 'token',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'released',
          inputs: [
            {
              name: 'token',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'start',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'vestedAmount',
          inputs: [
            {
              name: 'token',
              type: 'address',
              internalType: 'address',
            },
            {
              name: 'timestamp',
              type: 'uint64',
              internalType: 'uint64',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
      ],
    },
    {
      name: 'GatewayRegistry',
      abi: [
        {
          type: 'function',
          name: 'register',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
            {
              name: 'metadata',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'setMetadata',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
            {
              name: 'metadata',
              type: 'string',
              internalType: 'string',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'stake',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'durationBlocks',
              type: 'uint128',
              internalType: 'uint128',
            },
            {
              name: 'withAutoExtension',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'unregister',
          inputs: [
            {
              name: 'peerId',
              type: 'bytes',
              internalType: 'bytes',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'unstake',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'computationUnitsAmount',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'durationBlocks',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'addStake',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'disableAutoExtension',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'enableAutoExtension',
          inputs: [],
          outputs: [],
          stateMutability: 'nonpayable',
        },
        {
          type: 'function',
          name: 'canUnstake',
          inputs: [
            {
              name: 'operator',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'bool',
              internalType: 'bool',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'computationUnitsAmount',
          inputs: [
            {
              name: 'amount',
              type: 'uint256',
              internalType: 'uint256',
            },
            {
              name: 'durationBlocks',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'getStake',
          inputs: [
            {
              name: 'operator',
              type: 'address',
              internalType: 'address',
            },
          ],
          outputs: [
            {
              name: '',
              type: 'tuple',
              internalType: 'struct IGatewayRegistry.Stake',
              components: [
                {
                  name: 'amount',
                  type: 'uint256',
                  internalType: 'uint256',
                },
                {
                  name: 'lockStart',
                  type: 'uint128',
                  internalType: 'uint128',
                },
                {
                  name: 'lockEnd',
                  type: 'uint128',
                  internalType: 'uint128',
                },
                {
                  name: 'duration',
                  type: 'uint128',
                  internalType: 'uint128',
                },
                {
                  name: 'autoExtension',
                  type: 'bool',
                  internalType: 'bool',
                },
                {
                  name: 'oldCUs',
                  type: 'uint256',
                  internalType: 'uint256',
                },
              ],
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'minStake',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
      ],
    },
    {
      name: 'RewardTreasury',
      abi: [
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
      ],
    },
    {
      name: 'SoftCap',
      abi: [
        {
          type: 'function',
          name: 'cap',
          inputs: [{ name: 'x', type: 'uint256', internalType: 'UD60x18' }],
          outputs: [{ name: '', type: 'uint256', internalType: 'UD60x18' }],
          stateMutability: 'pure',
        },
        {
          type: 'function',
          name: 'capedStake',
          inputs: [{ name: 'workerId', type: 'uint256', internalType: 'uint256' }],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'capedStakeAfterDelegation',
          inputs: [
            { name: 'workerId', type: 'uint256', internalType: 'uint256' },
            { name: 'delegationAmount', type: 'int256', internalType: 'int256' },
          ],
          outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
          stateMutability: 'view',
        },
      ],
    },
    {
      name: 'NetworkController',
      abi: [
        {
          type: 'function',
          name: 'bondAmount',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint256',
              internalType: 'uint256',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'epochLength',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint128',
              internalType: 'uint128',
            },
          ],
          stateMutability: 'view',
        },
        {
          type: 'function',
          name: 'workerEpochLength',
          inputs: [],
          outputs: [
            {
              name: '',
              type: 'uint128',
              internalType: 'uint128',
            },
          ],
          stateMutability: 'view',
        },
      ],
    },
  ],
  plugins: [react({})],
});
