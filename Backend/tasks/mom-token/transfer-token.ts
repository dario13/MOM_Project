import { task } from 'hardhat/config'
import { MOMTokenV1, MOMTokenV1__factory } from '../../typechain-types'

task(
  'transferToken',
  'Given an address and an amount, transfers the amount of tokens to the address.' +
    'Example: yarn hardhat transferToken --to {address} --amount {amount} --network localhost',
)
  .addParam('to', 'The address to transfer the token to')
  .addParam('amount', 'The amount of tokens to transfer')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre
    const { to, amount } = taskArgs

    const { owner } = await hre.getNamedAccounts()

    console.log('Transferring tokens to: ', to, 'from: ', owner)

    const signer = await ethers.getSigner(owner)
    const momTokenDeployment = await hre.deployments.get('MOMTokenV1')
    const momTokenContract: MOMTokenV1 = MOMTokenV1__factory.connect(
      momTokenDeployment.address,
      signer,
    )

    console.log(
      'Balance of receiver before transfer',
      (await momTokenContract.balanceOf(to)).toString(),
    )

    const tx = await momTokenContract.transfer(to, amount)
    await tx.wait()

    console.log(`Transfered ${amount} tokens to ${to}`)
    console.log(
      'Balance of receiver after transfer',
      (await momTokenContract.balanceOf(to)).toString(),
    )
  })
