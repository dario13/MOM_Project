import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@openzeppelin/hardhat-upgrades'
import './tasks'
import * as dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''
const ADMIN_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || ''
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER || '0'

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
    owner: 1,
    userA: 2,
    userB: 3,
    userC: 4,
  },
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: ADMIN_PRIVATE_KEY !== undefined ? [ADMIN_PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 5,
    },
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL,
        blockNumber: Number(FORKING_BLOCK_NUMBER),
        enabled: false,
      },
    },
    localhost: {
      chainId: 31337,
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
      },
      {
        version: '0.6.6',
      },
    ],
    settings: {
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    },
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
  },
}

export default config
