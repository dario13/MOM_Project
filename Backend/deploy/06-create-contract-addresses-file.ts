import { ethers } from 'hardhat'
import { promises as fs } from 'fs'
import * as path from 'path'
import { DeployFunction } from 'hardhat-deploy/types'

const func: DeployFunction = async function () {
  const contractList = {
    PriceFeedConsumer: (await ethers.getContract('PriceFeedConsumer')).address,
    ExchangeV1: (await ethers.getContract('ExchangeV1')).address,
    MOMTokenV1: (await ethers.getContract('MOMTokenV1')).address,
    GameV1: (await ethers.getContract('GameV1')).address,
    blockConfirmations: 1,
  }

  const filePath = path.join(__dirname, '..', 'deployed-contract-addresses.json')
  await fs.writeFile(filePath, JSON.stringify(contractList, null, 2))

  console.log(`Contract addresses and names saved to ${filePath}`)
}

export default func
func.tags = ['CreateContractList']
