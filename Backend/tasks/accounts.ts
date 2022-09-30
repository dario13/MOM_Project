import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'

task(
  'accounts',
  'Prints the list of accounts',
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const accounts = await hre.getNamedAccounts()

    for (const account in accounts) {
      console.log('Account name: ' + account + ' --- Address: ' + accounts[account])
    }
  },
)
