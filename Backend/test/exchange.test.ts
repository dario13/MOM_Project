import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts, upgrades } from 'hardhat'

import { setupNamedUsers } from './utils/setup-users'
import { BigNumber } from 'ethers'
import { convertWeiToMom } from '../utils/token-conversion'
import { networkConfig } from '../helper-hardhat-config'
import { ExchangeV1__factory, MOMTokenV1 } from 'typechain-types'

const setup = async () => {
  await deployments.fixture(['ExchangeV1', 'MOMTokenV1'])

  const provider = ethers.provider

  const config = networkConfig.default

  const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')
  const ExchangeFactory: ExchangeV1__factory = await ethers.getContractFactory('ExchangeV1')
  const ExchangeContract = await upgrades.deployProxy(
    ExchangeFactory,
    [config.ownerAddress, MomTokenContract.address],
    {
      initializer: 'initialize',
    },
  )

  const contracts = {
    Exchange: ExchangeContract,
    MOMToken: MomTokenContract,
  }

  const { owner, userA } = await getNamedAccounts()

  const users = await setupNamedUsers({ owner, userA }, contracts)

  // Put some ethers and tokens into the exchange
  const weiAmount = { value: ethers.utils.parseEther('100.0') }
  const MOMTokenAmount = 100000000000
  await users.owner.Exchange.depositWei(weiAmount)
  await users.owner.MOMToken.transfer(ExchangeContract.address, MOMTokenAmount)

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
    const { owner } = await getNamedAccounts()

    // When
    const contractOwner = await Exchange.owner()

    // Then
    expect(contractOwner).to.equal(owner)
  })

  it('when a certain amount is deposited, the balance of the exchange must be the balance before the deposit plus the new deposit', async () => {
    // Given
    const { Exchange, users } = await setup()
    const { userA } = users
    const amount = { value: ethers.utils.parseEther('1.0') }

    // When
    const balanceBeforeDeposit = await Exchange.getExchangeWeiBalance()
    await userA.Exchange.depositWei(amount)
    const balanceAfterDeposit = await Exchange.getExchangeWeiBalance()

    // Then
    expect(balanceAfterDeposit).to.equal(amount.value.add(balanceBeforeDeposit))
  })

  it('when a certain amount is withdrawn, the balance of the exchange must be the balance before the withdrew minus the withdrawal amount', async () => {
    // Given
    const { Exchange, users } = await setup()
    const { owner } = users
    const amount = ethers.utils.parseEther('1.0')

    // When
    const balanceBeforeWithdrawal = await Exchange.getExchangeWeiBalance()
    await owner.Exchange.withdrawWei(amount, owner.address)
    const balanceAfterWithdrawal = await Exchange.getExchangeWeiBalance()

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
    expect(WitdhDrawTransaction()).to.be.revertedWith('NotOwner()')
  })

  it('an user with ethers should be able to buy MOM tokens', async () => {
    // Given
    const { MOMToken, users } = await setup()
    const { userA } = users
    const amountToBuy = { value: BigNumber.from(100000000000000) }

    // When
    await userA.Exchange.buyToken(amountToBuy)

    // Then
    expect(await MOMToken.balanceOf(userA.address)).to.equal(convertWeiToMom(amountToBuy.value))
  })

  it('a user with MOM tokens should be able to sell their tokens and get ETH back', async () => {
    // Given
    const { MOMToken, Exchange, users, provider } = await setup()
    const { owner, userA } = users

    const userAaddress = userA.address
    const amountToSell = 10000

    // Preload userA with MOM tokens
    await owner.MOMToken.transfer(userAaddress, 100000)

    const userAtokensBalanceBeforeSell = await userA.MOMToken.balanceOf(userAaddress)
    const userAgetContractWeiBalanceBeforeSell = await provider.getBalance(userAaddress)
    const exchangeTokensBalanceBeforeSell = await MOMToken.balanceOf(Exchange.address)
    const exchangeEthBalanceBeforeSell = await provider.getBalance(Exchange.address)

    // When
    await userA.MOMToken.approve(Exchange.address, amountToSell)
    await userA.Exchange.sellToken(amountToSell, userAaddress)
    const userAtokensBalanceAfterSell = await userA.MOMToken.balanceOf(userAaddress)
    const userAgetWeiBalanceAfterSell = await provider.getBalance(userAaddress)
    const exchangeTokensBalanceAfterSell = await MOMToken.balanceOf(Exchange.address)
    const exchangeEthBalanceAfterSell = await provider.getBalance(Exchange.address)

    // Then
    expect(userAtokensBalanceAfterSell).to.equal(userAtokensBalanceBeforeSell.sub(amountToSell))
    expect(userAgetWeiBalanceAfterSell).to.be.gt(userAgetContractWeiBalanceBeforeSell)
    expect(exchangeEthBalanceAfterSell).to.be.lt(exchangeEthBalanceBeforeSell)
    expect(exchangeTokensBalanceAfterSell).to.equal(
      exchangeTokensBalanceBeforeSell.add(amountToSell),
    )
  })
})
