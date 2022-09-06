import { BigNumber } from 'ethers'

export type NetworkConfigItem = {
  networkName: string
  fundAmount: BigNumber
  ethUsdPriceFeedAddress?: string
  verificationBlockConfirmations?: number
}

type NetworkConfigMap = {
  [chainId: string]: NetworkConfigItem
}

export const networkConfig: NetworkConfigMap = {
  default: {
    networkName: 'hardhat',
    fundAmount: BigNumber.from('1000000000000000000000'),
    verificationBlockConfirmations: 1,
  },
  31337: {
    networkName: 'localhost',
    fundAmount: BigNumber.from('1000000000000000000000'),
    ethUsdPriceFeedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    verificationBlockConfirmations: 1,
  },
  5: {
    networkName: 'goerli',
    fundAmount: BigNumber.from('1000000000000000000000'),
    ethUsdPriceFeedAddress: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    verificationBlockConfirmations: 6,
  },
}
