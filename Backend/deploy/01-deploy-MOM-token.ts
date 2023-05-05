import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run, upgrades } from 'hardhat'
import { MOMTokenV1__factory } from 'typechain-types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, save } = deployments

  const MOMTokenFactory: MOMTokenV1__factory = await ethers.getContractFactory('MOMTokenV1')

  const { fundAmount, ownerAddress }: NetWorkInfo = await run('networkInfo')

  log('-----------------MomToken-Deployment----------------')

  const existingDeployment = await deployments.getOrNull('MOMTokenV1')
  if (existingDeployment) {
    log('MOMToken Proxy already deployed at:', existingDeployment.address)
    return
  }

  try {
    const MOMTokenProxy = await upgrades.deployProxy(MOMTokenFactory, [ownerAddress, fundAmount], {
      initializer: 'initialize',
    })
    await MOMTokenProxy.deployed()
    log('MOMToken Proxy deployed at:', MOMTokenProxy.address)

    // const MOMTokenImp = await upgrades.upgradeProxy(MOMTokenProxy.address, MOMTokenFactory)

    // log('MOMToken Implementation deployed at:', MOMTokenImp.address)

    const artifact = await deployments.getArtifact('MOMTokenV1')
    const MOMTokenDeployment = {
      address: MOMTokenProxy.address,
      ...artifact,
    }

    await save('MOMTokenV1', MOMTokenDeployment)
  } catch (error) {
    log('Error deploying proxys...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['MOMTokenV1']
