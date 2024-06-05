import { NetworkName, getSubsquidNetwork } from './useSubsquidNetwork.ts';

export function useContracts(): {
  SQD: `0x${string}`;
  WORKER_REGISTRATION: `0x${string}`;
  STAKING: `0x${string}`;
  REWARD_TREASURY: `0x${string}`;
  REWARD_DISTRIBUTION: `0x${string}`;
  GATEWAY_REGISTRATION: `0x${string}`;
  SOFT_CAP: `0x${string}`;
  SQD_TOKEN: string;
} {
  const network = getSubsquidNetwork();

  switch (network) {
    case NetworkName.Tethys: {
      return {
        SQD: `0x24f9C46d86c064a6FA2a568F918fe62fC6917B3c`,
        WORKER_REGISTRATION: `0xCD8e983F8c4202B0085825Cf21833927D1e2b6Dc`,
        STAKING: `0x347E326b8b4EA27c87d5CA291e708cdEC6d65EB5`,
        REWARD_TREASURY: `0x785136e611E15D532C36502AaBdfE8E35008c7ca`,
        REWARD_DISTRIBUTION: `0x68f9fE3504652360afF430dF198E1Cb7B2dCfD57`,
        GATEWAY_REGISTRATION: `0xAB46F688AbA4FcD1920F21E9BD16B229316D8b0a`,
        SOFT_CAP: `0x52f31c9c019f840A9C0e74F66ACc95455B254BeA`,
        SQD_TOKEN: 'tSQD',
      };
    }
    case NetworkName.Mainnet: {
      return {
        SQD: `0x1337420dED5ADb9980CFc35f8f2B054ea86f8aB1`,
        WORKER_REGISTRATION: `0x36e2b147db67e76ab67a4d07c293670ebefcae4e`,
        STAKING: `0xb31a0d39d2c69ed4b28d96e12cbf52c5f9ac9a51`,
        REWARD_TREASURY: `0x237abf43bc51fd5c50d0d598a1a4c26e56a8a2a0`,
        REWARD_DISTRIBUTION: `0x4de282bD18aE4987B3070F4D5eF8c80756362AEa`,
        GATEWAY_REGISTRATION: `0x8a90a1ce5fa8cf71de9e6f76b7d3c0b72feb8c4b`,
        SOFT_CAP: `0xde29d5215c28036ce56091ea91038c94c84c87d0`,
        SQD_TOKEN: 'SQD',
      };
    }
  }
}
