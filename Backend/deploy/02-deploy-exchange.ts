import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run, upgrades } from 'hardhat'
import { ExchangeV1__factory, MOMTokenV1 } from 'typechain-types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, save } = deployments

  const ExchangeFactory: ExchangeV1__factory = await ethers.getContractFactory('ExchangeV1')

  const { ownerAddress, isLocalNetwork, owner }: NetWorkInfo = await run('networkInfo')

  log('-----------------Exchange-Deployment----------------')

  try {
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

    const ExchangeImp = await upgrades.upgradeProxy(Exchange, ExchangeFactory)
    log('Exchange Implementation deployed at:', ExchangeImp.address)

    if (isLocalNetwork) {
      // Transfer 100eth to Exchange
      await owner.sendTransaction({
        to: ExchangeImp.address,
        value: ethers.utils.parseEther('100'),
      })

      // Transfer 1000000 tokens to Exchange
      await MomTokenContract.connect(owner).transfer(ExchangeImp.address, 1000000000)

      // Show MOM token balance of Exchange and owner
      log(
        'Exchange MOM token balance: ',
        (await MomTokenContract.balanceOf(Exchange.address)).toString(),
      )
      log('Owner MOM token balance: ', (await MomTokenContract.balanceOf(ownerAddress)).toString())
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
