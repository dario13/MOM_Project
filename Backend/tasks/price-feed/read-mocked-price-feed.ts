import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment, TaskArguments } from 'hardhat/types'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { PriceFeedConsumer, PriceFeedConsumer__factory } from '../../typechain-types'
import { NetWorkInfo } from '../network-info'

task('readMockedPriceFeed', 'Gets the mocked price from a Mock Price Feed').setAction(
  async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { isLocalHost }: NetWorkInfo = await hre.run('networkInfo')

    if (!isLocalHost) {
      console.log(
        'Only works with localhost. Run a node and run the task putting: --network localhost, at the end of the command',
      )
      return
    }

    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    const priceFeedConsumerDeployment = await hre.deployments.get('PriceFeedConsumer')

    const priceFeedConsumerContract: PriceFeedConsumer = PriceFeedConsumer__factory.connect(
      priceFeedConsumerDeployment.address,
      signer,
    )

    const [price, decimal] = await priceFeedConsumerContract.getLatestPrice()

    console.log(`Price is ${price.toString()}`)
    console.log(`Decimal quantity: ${decimal.toString()}`)
  },
)
