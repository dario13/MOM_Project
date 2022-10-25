import { BigNumber } from 'ethers'

export type NetworkConfigItem = {
  networkName: string
  fundAmount: BigNumber
  ethUsdPriceFeedAddress?: string
  blockConfirmations?: number
  ownerAddress: string
}

type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigMap = {
  default: {
    networkName: 'hardhat',
    fundAmount: BigNumber.from('1000000000000000000000'),
    blockConfirmations: 1,
    ownerAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  },
  31337: {
    networkName: 'localhost',
    fundAmount: BigNumber.from('1000000000000000000000'),
    ethUsdPriceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    blockConfirmations: 1,
    ownerAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  },
  5: {
    networkName: 'goerli',
    fundAmount: BigNumber.from('1000000000000000000000'),
    ethUsdPriceFeedAddress: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    blockConfirmations: 6,
    ownerAddress: '0xf36D1BdfD527fb4c7359Bc66Bf5f8277164FD486',
  },
}
