import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { Exchange, MOMToken } from 'typechain-types'
import { setupNamedUsers } from './utils/setup-users'
import { BigNumber } from 'ethers'
import { convertWeiToMom } from '../utils/token-conversion'

const setup = async () => {
  await deployments.fixture(['Exchange', 'MOMToken'])

  const provider = ethers.provider

  const ExchangeContract: Exchange = await ethers.getContract('Exchange')
  const MomTokenContract: MOMToken = await ethers.getContract('MOMToken')

  const contracts = {
    Exchange: ExchangeContract,
    MOMToken: MomTokenContract,
  }

  const users = await setupNamedUsers(await getNamedAccounts(), contracts)

  // Put some ethers and tokens into the exchange
  const weiAmount = { value: ethers.utils.parseEther('100.0') }
  const MOMTokenAmount = 100000000000
  await users.tokenOwner.Exchange.depositWei(weiAmount)
  await users.tokenOwner.MOMToken.transfer(ExchangeContract.address, MOMTokenAmount)

  return {
    ...contracts,
    users,
    provider,
  }
}

describe('Exchange contract tests', () => {
  it('should have the right owner', async () => {
    // Given
    const { Exchange } = await setup()
    const { tokenOwner } = await getNamedAccounts()

    // When
    const contractOwner = await Exchange.getOwner()

    // Then
    expect(contractOwner).to.equal(tokenOwner)
  })

  it('when a certain amount is deposited, the balance of the exchange must be the balance before the deposit plus the new deposit', async () => {
    // Given
    const { Exchange, users } = await setup()
    const { userA } = users
    const amount = { value: ethers.utils.parseEther('1.0') }

    // When
    const balanceBeforeDeposit = await Exchange.getWeiBalance()
    await userA.Exchange.depositWei(amount)
    const balanceAfterDeposit = await Exchange.getWeiBalance()

    // Then
    expect(balanceAfterDeposit).to.equal(amount.value.add(balanceBeforeDeposit))
  })

  it('when a certain amount is withdrawn, the balance of the exchange must be the balance before the withdrew minus the withdrawal amount', async () => {
    // Given
    const { Exchange, users } = await setup()
    const { tokenOwner } = users
    const amount = ethers.utils.parseEther('1.0')

    // When
    const balanceBeforeWithdrawal = await Exchange.getWeiBalance()
    await tokenOwner.Exchange.withdrawWei(amount, tokenOwner.address)
    const balanceAfterWithdrawal = await Exchange.getWeiBalance()

    // Then
    expect(balanceAfterWithdrawal).to.equal(balanceBeforeWithdrawal.sub(amount))
  })

  it('should fail when a non-owner tries to withdraw the exchange balance', async () => {
    // Given
    const { users } = await setup()
    const { userA } = users
    const amount = { value: ethers.utils.parseEther('1.0') }
    await userA.Exchange.depositWei(amount)

    // When
    const WitdhDrawTransaction = async () =>
      await userA.Exchange.withdrawWei(amount.value, userA.address)

    // Then
    expect(WitdhDrawTransaction()).to.be.revertedWith('Only owner can perform this operation')
  })

  it('an user with ethers should be able to buy MOM tokens', async () => {
    // Given
    const { MOMToken, users } = await setup()
    const { userA } = users
    const amountToBuy = { value: BigNumber.from(100000000000000) }
    console.log(
      'exchange balance before buy',
      await (await userA.Exchange.getContractTokenBalance()).toString(),
    )

    // When
    await userA.Exchange.buyToken(amountToBuy)

    // Then
    expect(await MOMToken.balanceOf(userA.address)).to.equal(convertWeiToMom(amountToBuy.value))
  })

  it('a user with MOM tokens should be able to sell their tokens and get ETH back', async () => {
    // Given
    const { MOMToken, Exchange, users, provider } = await setup()
    const { tokenOwner, userA } = users

    const userAaddress = userA.address
    const amountToSell = 10000

    // Preload userA with MOM tokens
    await tokenOwner.MOMToken.transfer(userAaddress, 100000)

    const userAtokensBalanceBeforeSell = await userA.MOMToken.balanceOf(userAaddress)
    const userAWeiBalanceBeforeSell = await provider.getBalance(userAaddress)
    const exchangeTokensBalanceBeforeSell = await MOMToken.balanceOf(Exchange.address)
    const exchangeEthBalanceBeforeSell = await provider.getBalance(Exchange.address)

    // When
    await userA.MOMToken.approve(Exchange.address, amountToSell)
    await userA.Exchange.sellToken(amountToSell)
    const userAtokensBalanceAfterSell = await userA.MOMToken.balanceOf(userAaddress)
    const userAWeiBalanceAfterSell = await provider.getBalance(userAaddress)
    const exchangeTokensBalanceAfterSell = await MOMToken.balanceOf(Exchange.address)
    const exchangeEthBalanceAfterSell = await provider.getBalance(Exchange.address)

    // Then
    expect(userAtokensBalanceAfterSell).to.equal(userAtokensBalanceBeforeSell.sub(amountToSell))
    expect(userAWeiBalanceAfterSell).to.be.gt(userAWeiBalanceBeforeSell)
    expect(exchangeEthBalanceAfterSell).to.be.lt(exchangeEthBalanceBeforeSell)
    expect(exchangeTokensBalanceAfterSell).to.equal(
      exchangeTokensBalanceBeforeSell.add(amountToSell),
    )
  })
})
