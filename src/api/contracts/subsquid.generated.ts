import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GatewayRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gatewayRegistryAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'peerId', internalType: 'bytes', type: 'bytes' },
      { name: 'metadata', internalType: 'string', type: 'string' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'peerId', internalType: 'bytes', type: 'bytes' },
      { name: 'metadata', internalType: 'string', type: 'string' },
    ],
    name: 'setMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'durationBlocks', internalType: 'uint128', type: 'uint128' },
      { name: 'withAutoExtension', internalType: 'bool', type: 'bool' },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'peerId', internalType: 'bytes', type: 'bytes' }],
    name: 'unregister',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unstake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'durationBlocks', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computationUnitsAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'addStake',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'disableAutoExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'enableAutoExtension',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'canUnstake',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'durationBlocks', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computationUnitsAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'getStake',
    outputs: [
      {
        name: '',
        internalType: 'struct IGatewayRegistry.Stake',
        type: 'tuple',
        components: [
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          { name: 'lockStart', internalType: 'uint128', type: 'uint128' },
          { name: 'lockEnd', internalType: 'uint128', type: 'uint128' },
          { name: 'duration', internalType: 'uint128', type: 'uint128' },
          { name: 'autoExtension', internalType: 'bool', type: 'bool' },
          { name: 'oldCUs', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NetworkController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const networkControllerAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'bondAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'epochLength',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'workerEpochLength',
    outputs: [{ name: '', internalType: 'uint128', type: 'uint128' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RewardTreasury
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rewardTreasuryAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'rewardDistribution',
        internalType: 'contract IRewardsDistribution',
        type: 'address',
      },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'claimFor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Router
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const routerAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'networkController',
    outputs: [
      {
        name: '',
        internalType: 'contract INetworkController',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardCalculation',
    outputs: [
      {
        name: '',
        internalType: 'contract IRewardCalculation',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'rewardTreasury',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'staking',
    outputs: [{ name: '', internalType: 'contract IStaking', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'workerRegistration',
    outputs: [
      {
        name: '',
        internalType: 'contract IWorkerRegistration',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SQD
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sqdAbi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SoftCap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const softCapAbi = [
  {
    type: 'function',
    inputs: [{ name: 'x', internalType: 'UD60x18', type: 'uint256' }],
    name: 'cap',
    outputs: [{ name: '', internalType: 'UD60x18', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'workerId', internalType: 'uint256', type: 'uint256' }],
    name: 'capedStake',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'workerId', internalType: 'uint256', type: 'uint256' },
      { name: 'delegationAmount', internalType: 'int256', type: 'int256' },
    ],
    name: 'capedStakeAfterDelegation',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Staking
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stakingAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'worker', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'worker', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'staker', internalType: 'address', type: 'address' }],
    name: 'claimable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'worker', internalType: 'uint256', type: 'uint256' }],
    name: 'delegated',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Vesting
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const vestingAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'depositedIntoProtocol',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'duration',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'end',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'requiredApprove', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'execute',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'expectedTotalAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'immediateReleaseBIP',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'releasable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'releasable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'release',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'released',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'start',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'timestamp', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'vestedAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WorkerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const workerRegistryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'bondAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'peerId', internalType: 'bytes', type: 'bytes' },
      { name: 'metadata', internalType: 'string', type: 'string' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'peerId', internalType: 'bytes', type: 'bytes' },
      { name: 'metadata', internalType: 'string', type: 'string' },
    ],
    name: 'updateMetadata',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'peerId', internalType: 'bytes', type: 'bytes' }],
    name: 'deregister',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'peerId', internalType: 'bytes', type: 'bytes' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gatewayRegistryAbi}__
 */
export const useReadGatewayRegistry = /*#__PURE__*/ createUseReadContract({
  abi: gatewayRegistryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"computationUnitsAmount"`
 */
export const useReadGatewayRegistryComputationUnitsAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: gatewayRegistryAbi,
    functionName: 'computationUnitsAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"canUnstake"`
 */
export const useReadGatewayRegistryCanUnstake =
  /*#__PURE__*/ createUseReadContract({
    abi: gatewayRegistryAbi,
    functionName: 'canUnstake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"getStake"`
 */
export const useReadGatewayRegistryGetStake =
  /*#__PURE__*/ createUseReadContract({
    abi: gatewayRegistryAbi,
    functionName: 'getStake',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"minStake"`
 */
export const useReadGatewayRegistryMinStake =
  /*#__PURE__*/ createUseReadContract({
    abi: gatewayRegistryAbi,
    functionName: 'minStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__
 */
export const useWriteGatewayRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: gatewayRegistryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useWriteGatewayRegistryRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"setMetadata"`
 */
export const useWriteGatewayRegistrySetMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'setMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"stake"`
 */
export const useWriteGatewayRegistryStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"unregister"`
 */
export const useWriteGatewayRegistryUnregister =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'unregister',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"unstake"`
 */
export const useWriteGatewayRegistryUnstake =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"addStake"`
 */
export const useWriteGatewayRegistryAddStake =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'addStake',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"disableAutoExtension"`
 */
export const useWriteGatewayRegistryDisableAutoExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'disableAutoExtension',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"enableAutoExtension"`
 */
export const useWriteGatewayRegistryEnableAutoExtension =
  /*#__PURE__*/ createUseWriteContract({
    abi: gatewayRegistryAbi,
    functionName: 'enableAutoExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__
 */
export const useSimulateGatewayRegistry =
  /*#__PURE__*/ createUseSimulateContract({ abi: gatewayRegistryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateGatewayRegistryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"setMetadata"`
 */
export const useSimulateGatewayRegistrySetMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'setMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"stake"`
 */
export const useSimulateGatewayRegistryStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'stake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"unregister"`
 */
export const useSimulateGatewayRegistryUnregister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'unregister',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"unstake"`
 */
export const useSimulateGatewayRegistryUnstake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'unstake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"addStake"`
 */
export const useSimulateGatewayRegistryAddStake =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'addStake',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"disableAutoExtension"`
 */
export const useSimulateGatewayRegistryDisableAutoExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'disableAutoExtension',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gatewayRegistryAbi}__ and `functionName` set to `"enableAutoExtension"`
 */
export const useSimulateGatewayRegistryEnableAutoExtension =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gatewayRegistryAbi,
    functionName: 'enableAutoExtension',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link networkControllerAbi}__
 */
export const useReadNetworkController = /*#__PURE__*/ createUseReadContract({
  abi: networkControllerAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link networkControllerAbi}__ and `functionName` set to `"bondAmount"`
 */
export const useReadNetworkControllerBondAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: networkControllerAbi,
    functionName: 'bondAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link networkControllerAbi}__ and `functionName` set to `"epochLength"`
 */
export const useReadNetworkControllerEpochLength =
  /*#__PURE__*/ createUseReadContract({
    abi: networkControllerAbi,
    functionName: 'epochLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link networkControllerAbi}__ and `functionName` set to `"workerEpochLength"`
 */
export const useReadNetworkControllerWorkerEpochLength =
  /*#__PURE__*/ createUseReadContract({
    abi: networkControllerAbi,
    functionName: 'workerEpochLength',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTreasuryAbi}__
 */
export const useWriteRewardTreasury = /*#__PURE__*/ createUseWriteContract({
  abi: rewardTreasuryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link rewardTreasuryAbi}__ and `functionName` set to `"claimFor"`
 */
export const useWriteRewardTreasuryClaimFor =
  /*#__PURE__*/ createUseWriteContract({
    abi: rewardTreasuryAbi,
    functionName: 'claimFor',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTreasuryAbi}__
 */
export const useSimulateRewardTreasury =
  /*#__PURE__*/ createUseSimulateContract({ abi: rewardTreasuryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link rewardTreasuryAbi}__ and `functionName` set to `"claimFor"`
 */
export const useSimulateRewardTreasuryClaimFor =
  /*#__PURE__*/ createUseSimulateContract({
    abi: rewardTreasuryAbi,
    functionName: 'claimFor',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__
 */
export const useReadRouter = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"networkController"`
 */
export const useReadRouterNetworkController =
  /*#__PURE__*/ createUseReadContract({
    abi: routerAbi,
    functionName: 'networkController',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"rewardCalculation"`
 */
export const useReadRouterRewardCalculation =
  /*#__PURE__*/ createUseReadContract({
    abi: routerAbi,
    functionName: 'rewardCalculation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"rewardTreasury"`
 */
export const useReadRouterRewardTreasury = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'rewardTreasury',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"staking"`
 */
export const useReadRouterStaking = /*#__PURE__*/ createUseReadContract({
  abi: routerAbi,
  functionName: 'staking',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link routerAbi}__ and `functionName` set to `"workerRegistration"`
 */
export const useReadRouterWorkerRegistration =
  /*#__PURE__*/ createUseReadContract({
    abi: routerAbi,
    functionName: 'workerRegistration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__
 */
export const useReadSqd = /*#__PURE__*/ createUseReadContract({ abi: sqdAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadSqdAllowance = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadSqdBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadSqdDecimals = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"name"`
 */
export const useReadSqdName = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadSqdSymbol = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadSqdTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: sqdAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sqdAbi}__
 */
export const useWriteSqd = /*#__PURE__*/ createUseWriteContract({ abi: sqdAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteSqdApprove = /*#__PURE__*/ createUseWriteContract({
  abi: sqdAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteSqdTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: sqdAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteSqdTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: sqdAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sqdAbi}__
 */
export const useSimulateSqd = /*#__PURE__*/ createUseSimulateContract({
  abi: sqdAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateSqdApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: sqdAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateSqdTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: sqdAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link sqdAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateSqdTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: sqdAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sqdAbi}__
 */
export const useWatchSqdEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: sqdAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sqdAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchSqdApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sqdAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link sqdAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchSqdTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: sqdAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link softCapAbi}__
 */
export const useReadSoftCap = /*#__PURE__*/ createUseReadContract({
  abi: softCapAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link softCapAbi}__ and `functionName` set to `"cap"`
 */
export const useReadSoftCapCap = /*#__PURE__*/ createUseReadContract({
  abi: softCapAbi,
  functionName: 'cap',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link softCapAbi}__ and `functionName` set to `"capedStake"`
 */
export const useReadSoftCapCapedStake = /*#__PURE__*/ createUseReadContract({
  abi: softCapAbi,
  functionName: 'capedStake',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link softCapAbi}__ and `functionName` set to `"capedStakeAfterDelegation"`
 */
export const useReadSoftCapCapedStakeAfterDelegation =
  /*#__PURE__*/ createUseReadContract({
    abi: softCapAbi,
    functionName: 'capedStakeAfterDelegation',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useReadStaking = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"claimable"`
 */
export const useReadStakingClaimable = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  functionName: 'claimable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"delegated"`
 */
export const useReadStakingDelegated = /*#__PURE__*/ createUseReadContract({
  abi: stakingAbi,
  functionName: 'delegated',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useWriteStaking = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteStakingDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteStakingWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: stakingAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__
 */
export const useSimulateStaking = /*#__PURE__*/ createUseSimulateContract({
  abi: stakingAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateStakingDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link stakingAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateStakingWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: stakingAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__
 */
export const useReadVesting = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"depositedIntoProtocol"`
 */
export const useReadVestingDepositedIntoProtocol =
  /*#__PURE__*/ createUseReadContract({
    abi: vestingAbi,
    functionName: 'depositedIntoProtocol',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"duration"`
 */
export const useReadVestingDuration = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'duration',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"end"`
 */
export const useReadVestingEnd = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'end',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"expectedTotalAmount"`
 */
export const useReadVestingExpectedTotalAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: vestingAbi,
    functionName: 'expectedTotalAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"immediateReleaseBIP"`
 */
export const useReadVestingImmediateReleaseBip =
  /*#__PURE__*/ createUseReadContract({
    abi: vestingAbi,
    functionName: 'immediateReleaseBIP',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"releasable"`
 */
export const useReadVestingReleasable = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'releasable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"released"`
 */
export const useReadVestingReleased = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'released',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"start"`
 */
export const useReadVestingStart = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'start',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"vestedAmount"`
 */
export const useReadVestingVestedAmount = /*#__PURE__*/ createUseReadContract({
  abi: vestingAbi,
  functionName: 'vestedAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vestingAbi}__
 */
export const useWriteVesting = /*#__PURE__*/ createUseWriteContract({
  abi: vestingAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"execute"`
 */
export const useWriteVestingExecute = /*#__PURE__*/ createUseWriteContract({
  abi: vestingAbi,
  functionName: 'execute',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"release"`
 */
export const useWriteVestingRelease = /*#__PURE__*/ createUseWriteContract({
  abi: vestingAbi,
  functionName: 'release',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vestingAbi}__
 */
export const useSimulateVesting = /*#__PURE__*/ createUseSimulateContract({
  abi: vestingAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"execute"`
 */
export const useSimulateVestingExecute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vestingAbi,
    functionName: 'execute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link vestingAbi}__ and `functionName` set to `"release"`
 */
export const useSimulateVestingRelease =
  /*#__PURE__*/ createUseSimulateContract({
    abi: vestingAbi,
    functionName: 'release',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link workerRegistryAbi}__
 */
export const useReadWorkerRegistry = /*#__PURE__*/ createUseReadContract({
  abi: workerRegistryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"bondAmount"`
 */
export const useReadWorkerRegistryBondAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: workerRegistryAbi,
    functionName: 'bondAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link workerRegistryAbi}__
 */
export const useWriteWorkerRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: workerRegistryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useWriteWorkerRegistryRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: workerRegistryAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useWriteWorkerRegistryUpdateMetadata =
  /*#__PURE__*/ createUseWriteContract({
    abi: workerRegistryAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"deregister"`
 */
export const useWriteWorkerRegistryDeregister =
  /*#__PURE__*/ createUseWriteContract({
    abi: workerRegistryAbi,
    functionName: 'deregister',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWorkerRegistryWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: workerRegistryAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link workerRegistryAbi}__
 */
export const useSimulateWorkerRegistry =
  /*#__PURE__*/ createUseSimulateContract({ abi: workerRegistryAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateWorkerRegistryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: workerRegistryAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"updateMetadata"`
 */
export const useSimulateWorkerRegistryUpdateMetadata =
  /*#__PURE__*/ createUseSimulateContract({
    abi: workerRegistryAbi,
    functionName: 'updateMetadata',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"deregister"`
 */
export const useSimulateWorkerRegistryDeregister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: workerRegistryAbi,
    functionName: 'deregister',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link workerRegistryAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWorkerRegistryWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: workerRegistryAbi,
    functionName: 'withdraw',
  })
