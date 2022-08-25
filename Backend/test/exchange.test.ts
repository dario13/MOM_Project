import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { Exchange, MOMToken } from 'typechain-types'
import { setupNamedUsers } from './utils/setup-users'

const setup = async () => {
  await deployments.fixture(['Exchange', 'MOMToken'])

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
  await users.tokenOwner.Exchange.deposit(weiAmount)
  await users.tokenOwner.MOMToken.transfer(ExchangeContract.address, MOMTokenAmount)

  return {
    ...contracts,
    users,
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
    await userA.Exchange.deposit(amount)
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
    await userA.Exchange.deposit(amount)

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
    const amountToBuy = { value: 113 }

    // When
    await userA.Exchange.buy(amountToBuy)

    // Then
    expect(await MOMToken.balanceOf(userA.address)).to.equal(amountToBuy.value)
  })

  it('a user with MOM tokens should be able to sell their tokens and get ETH back', async () => {
    // Given
    const { MOMToken, Exchange, users } = await setup()
    const { tokenOwner, userA } = users

    const userAaddress = userA.address
    const amountToSell = { value: 1000 }

    await tokenOwner.MOMToken.transfer(userAaddress, 100000)
    const userAtokensBalanceBeforeSell = await userA.MOMToken.balanceOf(userAaddress)
    const exchangeTokensBalanceBeforeSell = await MOMToken.balanceOf(Exchange.address)

    // When
    await userA.MOMToken.approve(Exchange.address, amountToSell.value)
    await userA.Exchange.sell(amountToSell)
    const userAtokensBalanceAfterSell = await userA.MOMToken.balanceOf(userAaddress)
    const exchangeTokensBalanceAfterSell = await MOMToken.balanceOf(Exchange.address)

    // Then
    expect(userAtokensBalanceAfterSell).to.equal(
      userAtokensBalanceBeforeSell.sub(amountToSell.value),
    )
    expect(exchangeTokensBalanceAfterSell).to.equal(
      exchangeTokensBalanceBeforeSell.add(amountToSell.value),
    )
  })
})