import { BigNumber } from 'ethers'

export type NetworkConfigItem = {
  networkName: string
  fundAmount: BigNumber
  blockConfirmations?: number
  ownerAddress: string
}

type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigMap = {
  default: {
    networkName: 'hardhat',
    fundAmount: BigNumber.from((10 ** 18).toString()),
    blockConfirmations: 1,
    ownerAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  },
  31337: {
    networkName: 'localhost',
    fundAmount: BigNumber.from((10 ** 18).toString()),
    blockConfirmations: 1,
    ownerAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  },
  5: {
    networkName: 'goerli',
    fundAmount: BigNumber.from((10 ** 18).toString()),
    blockConfirmations: 6,
    ownerAddress: '0xf36D1BdfD527fb4c7359Bc66Bf5f8277164FD486',
  },
}
