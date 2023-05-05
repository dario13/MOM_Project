import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'
import { networkConfig, NetworkConfigItem } from '../helper-hardhat-config'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type NetWorkInfo = {
  isLocalNetwork: boolean
  isLocalHost: boolean
  chainId: number
  owner: SignerWithAddress
} & NetworkConfigItem

task(
  'networkInfo',
  'Returns all the information about the chosen network',
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<NetWorkInfo> => {
    const chainId: string | undefined = await hre.getChainId()

    const config = networkConfig[chainId]

    if (!chainId) {
      throw new Error('Chain id not specified')
    }

    const isLocalNetwork: boolean = chainId === '31337'

    const isLocalHost: boolean = hre.network.name === 'localhost'

    const owner = await hre.ethers.getSigner(config.ownerAddress)

    return {
      isLocalNetwork,
      isLocalHost,
      chainId: Number(chainId),
      owner,
      ...config,
    }
  },
)
