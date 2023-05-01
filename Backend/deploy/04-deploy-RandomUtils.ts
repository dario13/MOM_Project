import { DeployFunction } from 'hardhat-deploy/types'
import { run } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()

  const { blockConfirmations }: NetWorkInfo = await run('networkInfo')

  log('----------------------------------------------------')

  try {
    await deploy('RandomUtils', {
      from: deployer,
      log: true,
      args: [],
      waitConfirmations: blockConfirmations,
    })
  } catch (error) {
    log('Error deploying RandomUtils...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['RandomUtils']
