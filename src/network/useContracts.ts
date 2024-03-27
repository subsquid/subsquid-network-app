import { NetworkName, useSubsquidNetwork } from './useSubsquidNetwork.ts';

export function useContracts(): {
  SQD: `0x${string}`;
  WORKER_REGISTRATION: `0x${string}`;
  STAKING: `0x${string}`;
  REWARD_TREASURY: `0x${string}`;
  REWARD_DISTRIBUTION: `0x${string}`;
  GATEWAY_REGISTRATION: `0x${string}`;
  SQD_TOKEN: string;
} {
  const [network] = useSubsquidNetwork();

  switch (network) {
    case NetworkName.Testnet: {
      return {
        SQD: `0x24f9C46d86c064a6FA2a568F918fe62fC6917B3c`,
        WORKER_REGISTRATION: `0xCD8e983F8c4202B0085825Cf21833927D1e2b6Dc`,
        STAKING: `0x347E326b8b4EA27c87d5CA291e708cdEC6d65EB5`,
        REWARD_TREASURY: `0x785136e611E15D532C36502AaBdfE8E35008c7ca`,
        REWARD_DISTRIBUTION: `0x68f9fE3504652360afF430dF198E1Cb7B2dCfD57`,
        GATEWAY_REGISTRATION: `0xAB46F688AbA4FcD1920F21E9BD16B229316D8b0a`,
        SQD_TOKEN: 'tSQD',
      };
    }
    case NetworkName.Mainnet: {
      return {
        SQD: `0x1337420ded5adb9980cfc35f8f2b054ea86f8ab1`,
        WORKER_REGISTRATION: `0xxxxxxxxxxxx`,
        STAKING: `0xxxxxxxxxxxx`,
        REWARD_TREASURY: `0xxxxxxxxxxxx`,
        REWARD_DISTRIBUTION: `0xxxxxxxxxxxx`,
        GATEWAY_REGISTRATION: `0xxxxxxxxxxxx`,
        SQD_TOKEN: 'SQD',
      };
    }
  }
}
