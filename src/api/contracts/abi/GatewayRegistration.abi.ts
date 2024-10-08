export const GATEWAY_REGISTRATION_CONTRACT_ABI = [
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
] as const;
