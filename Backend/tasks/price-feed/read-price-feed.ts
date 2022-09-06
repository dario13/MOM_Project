import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { PriceFeedConsumer, PriceFeedConsumer__factory } from '../../typechain-types'
import { NetWorkInfo } from '../network-info'

task('readPriceFeed', 'Gets the latest price from a Chainlink Price Feed')
  .addOptionalParam(
    'contract',
    'The address of the Price Feed consumer contract that you want to read',
  )
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { networkName, isLocalNetwork }: NetWorkInfo = await hre.run('networkInfo')

    if (isLocalNetwork) {
      console.log('Only works with testnet networks')
      return
    }

    const deployment = await hre.deployments.get('PriceFeedConsumer')

    const contractAddr: string = taskArgs.contract ? taskArgs.contract : deployment.address

    console.log(
      `Reading data from Price Feed consumer contract ${contractAddr} on network ${networkName}`,
    )

    // Get signer information
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    const priceFeedConsumerContract: PriceFeedConsumer = PriceFeedConsumer__factory.connect(
      contractAddr,
      signer,
    )

    const [price, decimal] = await priceFeedConsumerContract.getLatestPrice()
    const priceFormatted = price
      .div(10 ** decimal)
      .toNumber()
      .toFixed(2)
    console.log(`Price is ${price.toString()}`)
    console.log(`Price formatted is USD${priceFormatted.toString()}`)
  })
