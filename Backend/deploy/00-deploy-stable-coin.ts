import { run } from 'hardhat'
import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy, log } = deployments

  const { ownerAddress }: NetWorkInfo = await run('networkInfo')

  log('----------------------------------------------------')

  const existingDeployment = await deployments.getOrNull('USDtoken')
  if (existingDeployment) {
    log('USDtoken already deployed at:', existingDeployment.address)
    return
  }

  try {
    await deploy('USDtoken', {
      from: ownerAddress,
      args: [],
      log: true,
    })
  } catch (error) {
    log('USDtoken deployment failed:', error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['USDtoken']
