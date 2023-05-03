import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { ethers, run } from 'hardhat'
import { MOMTokenV1 } from 'typechain-types'
import { USDtoken } from 'typechain-types/contracts/USDtoken'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments } = hre
  const { log, deploy } = deployments

  const { ownerAddress, owner }: NetWorkInfo = await run('networkInfo')

  log('-----------------Exchange-Deployment----------------')

  try {
    const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
    const USDtokenContract: USDtoken = await ethers.getContract('USDtoken')

    const { address: exchangeAddress } = await deploy('Exchange', {
      from: ownerAddress,
      args: [MomTokenContract.address, USDtokenContract.address],
      log: true,
    })

    // Provide the exchange with some MOM tokens and some USD tokens
    const amountToTransfer = (10 ** 8).toString()
    await MomTokenContract.connect(owner).transfer(exchangeAddress, amountToTransfer)
    await USDtokenContract.connect(owner).transfer(exchangeAddress, amountToTransfer)

    log(
      'Exchange Stable Coin Balance:',
      (await USDtokenContract.connect(owner).balanceOf(exchangeAddress)).toString(),
    )
    log(
      'Exchange Mom token Balance:',
      (await MomTokenContract.connect(owner).balanceOf(exchangeAddress)).toString(),
    )

    log('----------------------------------------------------')
  } catch (error) {
    log('Error deploying Exchange...')
    log(error)
  }
}

export default func
func.tags = ['Exchange']
