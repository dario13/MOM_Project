import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run, upgrades } from 'hardhat'
import { ExchangeV1__factory, MOMTokenV1 } from 'typechain-types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, save } = deployments

  const ExchangeFactory: ExchangeV1__factory = await ethers.getContractFactory('ExchangeV1')

  const { ownerAddress, isLocalNetwork }: NetWorkInfo = await run('networkInfo')

  log('-----------------Exchange-Deployment----------------')

  try {
    const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
    console.log('MomTokenContract.address', MomTokenContract.address)
    const Exchange = await upgrades.deployProxy(
      ExchangeFactory,
      [ownerAddress, MomTokenContract.address],
      {
        initializer: 'initialize',
      },
    )
    await Exchange.deployed()
    log('Exchange deployed at:', Exchange.address)

    const ExchangeImp = await upgrades.upgradeProxy(Exchange, ExchangeFactory)
    log('Exchange Implementation deployed at:', ExchangeImp.address)

    // Transfer 100eth to Exchange, in local network
    if (isLocalNetwork) {
      const [owner] = await ethers.getSigners()
      await owner.sendTransaction({
        to: ExchangeImp.address,
        value: ethers.utils.parseEther('100'),
      })
    }

    log('Exchange balance: ', (await ethers.provider.getBalance(Exchange.address)).toString())

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
