import { expect } from './chai-setup'
import { ethers, getNamedAccounts } from 'hardhat'

import { smock } from '@defi-wonderland/smock'
import { Match__factory } from '../typechain-types'
import { RandomUtils__factory } from 'typechain-types/factories/contracts/RandomUtils__factory'

const setup = async () => {
  const provider = ethers.provider

  const cardsToWin = 4

  // Get users

  const { userA, userB } = await getNamedAccounts()

  const playerA = provider.getSigner(userA)

  const playerB = provider.getSigner(userB)

  // Mock the RandomUtils contract

  const MockedRandomUtilsFactory = (await smock.mock<RandomUtils__factory>('RandomUtils')).connect(
    playerA,
  )

  const RandomUtils = await MockedRandomUtilsFactory.deploy()

  // Mock the Match contract
  const MockedMatchFactory = (await smock.mock<Match__factory>('Match')).connect(playerA)

  const Match = await MockedMatchFactory.deploy(
    playerA.getAddress(),
    cardsToWin,
    RandomUtils.address,
  )

  enum betOptions {
    higher = 0,
    lower = 1,
  }

  return {
    Match,
    RandomUtils,
    cardsToWin,
    MockedMatchFactory,
    MockedRandomUtilsFactory,
    playerA,
    playerB,
    betOptions,
  }
}

describe('Match contract tests', () => {
  it('when a match is created, the contract will have a variable indicating the player`s address and how many cards to guess', async () => {
    // Given
    const { Match, playerA, cardsToWin } = await setup()
    const playerAaddress = await playerA.getAddress()

    // When
    const player = await Match.player()
    const cards = await Match.cardsToWin()

    // Then
    expect(player).to.equal(playerAaddress)
    expect(cards).to.equal(cardsToWin)
  })

  it('only match`s player can make a bet', async () => {
    // Given
    const { playerB, Match, betOptions } = await setup()
    await Match.startMatch()

    // When
    const playerAmakesBet = () => Match.bet(betOptions.higher)
    const playerBmakesBet = () => Match.connect(playerB).bet(betOptions.higher)

    // Then
    await expect(playerAmakesBet()).to.emit(Match, 'BetResult')
    await expect(playerBmakesBet()).to.be.revertedWith('OnlyPlayerCanCallThisFunction()')
  })

  it('if a match is over, the player cannot continue playing', async () => {
    // Given
    const { Match, betOptions } = await setup()
    await Match.startMatch()
    await Match.setVariable('_gameOver', true)

    // When
    const playerAtriesToBet = () => Match.bet(betOptions.higher)

    // Then
    await expect(playerAtriesToBet()).to.be.revertedWith('GameIsOver()')
  })

  it('Should win the game after completing all bets correctly', async function () {
    // Given
    const { Match, RandomUtils, betOptions } = await setup()

    RandomUtils.getRandomValue.returns(11)
    await Match.startMatch()
    const hand = 1
    RandomUtils.getRandomValue.returns(12)

    // When
    const firstBet = () => Match.bet(betOptions.higher)
    const secondBet = () => Match.bet(betOptions.higher)
    const thirdBet = () => Match.bet(betOptions.lower)
    const gameWon = () => Match.gameWon()

    // Then
    // the event is expected to generate a message indicating that the hand was won
    await expect(firstBet())
      .to.emit(Match, 'BetResult')
      .withArgs(true, hand + 1)
    RandomUtils.getRandomValue.returns(13)
    await expect(secondBet())
      .to.emit(Match, 'BetResult')
      .withArgs(true, hand + 2)
    RandomUtils.getRandomValue.returns(8)
    await expect(thirdBet())
      .to.emit(Match, 'BetResult')
      .withArgs(true, hand + 3)
    expect(await gameWon()).to.be.equal(true)
  })
})
