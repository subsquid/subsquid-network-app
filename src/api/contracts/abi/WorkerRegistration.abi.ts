export const WORKER_REGISTRATION_CONTRACT_ABI = [
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
] as const;
