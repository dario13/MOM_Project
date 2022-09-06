import { DeployFunction } from 'hardhat-deploy/types'
import { run } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()

  const {
    isLocalNetwork,
    networkName,
    ethUsdPriceFeedAddress,
    verificationBlockConfirmations,
  }: NetWorkInfo = await run('networkInfo')

  let ethUsdPriceFeedInterfaceAddress: string

  if (isLocalNetwork) {
    // use the mock contract
    const PriceFeedConsumer = await deployments.get('PriceFeedConsumerMock')
    ethUsdPriceFeedInterfaceAddress = PriceFeedConsumer.address
  } else {
    // use the interface address contract of the network specified
    const networkContractAddress = ethUsdPriceFeedAddress
    if (!networkContractAddress) {
      throw new Error(`Contract address not found for network ${networkName}`)
    }
    ethUsdPriceFeedInterfaceAddress = networkContractAddress
  }

  log('----------------------------------------------------')

  try {
    await deploy('PriceFeedConsumer', {
      from: deployer,
      log: true,
      args: [ethUsdPriceFeedInterfaceAddress],
      waitConfirmations: verificationBlockConfirmations,
    })
  } catch (error) {
    log('Error deploying PriceFeedConsumer...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['PriceFeed']
