import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { setupNamedUsers } from './utils/setup-users'
import { Exchange } from 'typechain-types/contracts/Exchange'
import { USDtoken } from 'typechain-types/contracts/USDtoken'
import { MOMTokenV1 } from 'typechain-types'

const setup = async () => {
  await deployments.fixture(['MOMTokenV1', 'USDtoken', 'Exchange'])

  const MomTokenV1Contract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
  const USDtokenContract: USDtoken = await ethers.getContract('USDtoken')
  const ExchangeContract: Exchange = await ethers.getContract('Exchange')

  const users = await setupNamedUsers(await getNamedAccounts(), {
    MomTokenV1: MomTokenV1Contract,
    USDtoken: USDtokenContract,
    Exchange: ExchangeContract,
  })

  return {
    MomTokenV1Contract,
    users,
  }
}

describe('Exchange contract tests', () => {
  it('should buy tokens with stablecoin', async () => {
    // Given
    const { MomTokenV1Contract, users } = await setup()
    const { owner, userA } = users
    const tokenAmountToBuy = (10 ** 4).toString()
    const maxStablecoinAmountToPay = (10 ** 5).toString()
    await owner.USDtoken.transfer(userA.address, maxStablecoinAmountToPay)

    // When
    await userA.USDtoken.approve(userA.Exchange.address, maxStablecoinAmountToPay)
    const userBalanceBeforeBuy = await MomTokenV1Contract.balanceOf(userA.address)
    await userA.Exchange.buyTokens(tokenAmountToBuy, maxStablecoinAmountToPay)
    const userBalanceAfterBuy = await MomTokenV1Contract.balanceOf(userA.address)

    // Then
    expect(userBalanceBeforeBuy).to.equal(0)
    expect(userBalanceAfterBuy).to.equal(tokenAmountToBuy)
  })
  it('should sell tokens for stablecoin', async () => {
    // Given
    const { users } = await setup()
    const { owner, userA } = users
    const tokenAmountToSell = (10 ** 5).toString()
    const minStablecoinAmountToReceive = (10 ** 4).toString()

    // Transfer tokens to userA
    await owner.MomTokenV1.transfer(userA.address, tokenAmountToSell)

    // When
    const userBalanceBeforeSell = await userA.USDtoken.balanceOf(userA.address)
    await userA.MomTokenV1.approve(userA.Exchange.address, tokenAmountToSell)
    await userA.Exchange.sellTokens(tokenAmountToSell, minStablecoinAmountToReceive)
    const userBalanceAfterSell = await userA.USDtoken.balanceOf(userA.address)

    // Then
    expect(userBalanceBeforeSell).to.equal(0)
    expect(userBalanceAfterSell.toNumber()).to.be.approximately(Number(tokenAmountToSell), 1000)
  })
  it('should get stablecoin amount in', async () => {
    // Given
    const { users } = await setup()
    const { userA } = users
    const tokenAmountToBuy = '1000'

    // When
    const stablecoinAmountOut = await userA.Exchange.getStableCoinAmountIn(tokenAmountToBuy)

    // Then
    expect(stablecoinAmountOut.toNumber()).to.be.approximately(Number(tokenAmountToBuy), 10)
  })
  it('should get token amount out', async () => {
    // Given
    const { users } = await setup()
    const { userA } = users
    const tokenAmountToSell = '1000'

    // When
    const tokenAmountOut = await userA.Exchange.getStableCoinAmountOut(tokenAmountToSell)

    // Then
    expect(tokenAmountOut.toNumber()).to.be.approximately(Number(tokenAmountToSell), 10)
  })
})
