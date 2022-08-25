import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import './tasks'

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  defaultNetwork: 'hardhat',
  namedAccounts: {
    deployer: 0,
    tokenOwner: 1,
    userA: 2,
    userB: 3,
    userC: 4,
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
  },
}

export default config
