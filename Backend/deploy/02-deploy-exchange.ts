import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'
import { run } from 'hardhat'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, log } = deployments

  const { deployer, tokenOwner } = await getNamedAccounts()
  const momTokenContractAddress = (await deployments.get('MOMToken')).address

  const { isLocalNetwork }: NetWorkInfo = await run('networkInfo')

  // Only differentiate between token owner and deployer in local network
  const tknOwner = isLocalNetwork ? tokenOwner : deployer

  log('----------------------------------------------------')

  try {
    await deploy('Exchange', {
      from: deployer,
      args: [tknOwner, momTokenContractAddress],
      log: true,
    })
  } catch (error) {
    log('Error deploying Exchange...')
    log(error)
  }

  log('----------------------------------------------------')
}
export default func
func.tags = ['Exchange']
