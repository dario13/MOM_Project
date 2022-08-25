import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy } = deployments

  const { deployer, tokenOwner } = await getNamedAccounts()

  await deploy('MOMToken', {
    from: deployer,
    args: [tokenOwner, '1000000000000000000000'],
    log: true,
  })
}

export default func
func.tags = ['MOMToken']
