#!/usr/bin/node

import 'dotenv/config';
import { CodegenConfig } from '@graphql-codegen/cli';

export default {
  overwrite: true,
  schema:
    process.env.SQUID_API_URL ||
    'https://subsquid.squids.live/subsquid-network-testnet/v/v5/graphql',
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
        scalars: {
          BigInt: 'string',
          DateTime: 'string',
        },
      },
    },
  },
} satisfies CodegenConfig;
