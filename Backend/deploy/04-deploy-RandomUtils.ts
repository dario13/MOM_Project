import { DeployFunction } from 'hardhat-deploy/types'
import { run } from 'hardhat'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { deploy, log } = deployments

  const { ownerAddress }: NetWorkInfo = await run('networkInfo')

  log('----------------------------------------------------')

  const existingDeployment = await deployments.getOrNull('RandomUtils')
  if (existingDeployment) {
    log('RandomUtils already deployed at:', existingDeployment.address)
    return
  }

  try {
    await deploy('RandomUtils', {
      from: ownerAddress,
      log: true,
      args: [],
    })
  } catch (error) {
    log('Error deploying RandomUtils...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['RandomUtils']
