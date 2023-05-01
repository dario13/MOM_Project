import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run, upgrades } from 'hardhat'
import { GameV1__factory, MOMTokenV1 } from 'typechain-types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, save } = deployments

  const GameFactory: GameV1__factory = await ethers.getContractFactory('GameV1')

  const { ownerAddress }: NetWorkInfo = await run('networkInfo')
  try {
    log('-----------------Game-Deployment--------------------')
    const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
    const RandomUtilsContract = await ethers.getContract('RandomUtils')
    const Game = await upgrades.deployProxy(
      GameFactory,
      [ownerAddress, MomTokenContract.address, RandomUtilsContract.address],
      {
        initializer: 'initialize',
      },
    )
    await Game.deployed()
    log('Game deployed at:', Game.address)

    const artifact = await deployments.getExtendedArtifact('GameV1')
    const GameDeployment = {
      address: Game.address,
      ...artifact,
    }

    await save('GameV1', GameDeployment)
  } catch (error) {
    log('Error deploying Game...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['GameV1']
