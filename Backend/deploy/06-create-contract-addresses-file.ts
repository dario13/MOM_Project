import { ethers, run } from 'hardhat'
import { promises as fs } from 'fs'
import * as path from 'path'
import { DeployFunction } from 'hardhat-deploy/types'
import { NetWorkInfo } from 'tasks'

const func: DeployFunction = async function () {
  const { isLocalNetwork }: NetWorkInfo = await run('networkInfo')

  const contractList = {
    Exchange: (await ethers.getContract('Exchange')).address,
    MOMTokenV1: (await ethers.getContract('MOMTokenV1')).address,
    USDtoken: (await ethers.getContract('USDtoken')).address,
    GameV1: (await ethers.getContract('GameV1')).address,
    blockConfirmations: 1,
  }

  const fileName = isLocalNetwork
    ? 'deployed-contract-addresses-local.json'
    : 'deployed-contract-addresses-testnet.json'
  const filePath = path.join(__dirname, '..', fileName)
  await fs.writeFile(filePath, JSON.stringify(contractList, null, 2))

  console.log(`Contract addresses and names saved to ${filePath}`)
}

export default func
func.tags = ['CreateContractList']
