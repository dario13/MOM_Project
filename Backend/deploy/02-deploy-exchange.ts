import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run, upgrades } from 'hardhat'
import { ExchangeV1__factory, MOMTokenV1 } from 'typechain-types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, save } = deployments

  const ExchangeFactory: ExchangeV1__factory = await ethers.getContractFactory('ExchangeV1')

  const { ownerAddress }: NetWorkInfo = await run('networkInfo')
  try {
    log('-----------------Exchange-Deployment----------------')
    const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
    const Exchange = await upgrades.deployProxy(
      ExchangeFactory,
      [ownerAddress, MomTokenContract.address],
      {
        initializer: 'initialize',
      },
    )
    await Exchange.deployed()
    log('Exchange deployed at:', Exchange.address)

    const artifact = await deployments.getExtendedArtifact('ExchangeV1')
    const ExchangeDeployment = {
      address: Exchange.address,
      ...artifact,
    }

    await save('ExchangeV1', ExchangeDeployment)
  } catch (error) {
    log('Error deploying Exchange...')
    log(error)
  }

  log('----------------------------------------------------')
}

export default func
func.tags = ['ExchangeV1']
