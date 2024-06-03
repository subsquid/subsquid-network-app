#!/usr/bin/node

import 'dotenv/config';

export default {
  overwrite: true,
  schema:
    process.env.SQUID_API_URL || 'https://subsquid.squids.live/subsquid-network-mainnet/graphql',
  documents: ['src/api/subsquid-network-squid/*.graphql'],
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
  generates: {
    'src/api/subsquid-network-squid/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-react-query': {
            reactQueryVersion: 5,
          },
        },
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
      config: {
        maybeValue: 'T',
        avoidOptionals: false,
      },
    },
  },
};
