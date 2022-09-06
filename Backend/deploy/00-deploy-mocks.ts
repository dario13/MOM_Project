import { DeployFunction } from 'hardhat-deploy/types'
import { run } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()

  const { isLocalNetwork }: NetWorkInfo = await run('networkInfo')

  if (!isLocalNetwork) return

  const DECIMALS = '18'
  const INITIAL_PRICE = '200000000000000000000'

  log('----------------------------------------------------')

  try {
    await deploy('PriceFeedConsumerMock', {
      contract: 'MockV3Aggregator',
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })
  } catch (error) {
    log('Error deploying Mocks...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['mocks']
