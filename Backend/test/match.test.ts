import { expect } from './chai-setup'
import { ethers, getNamedAccounts } from 'hardhat'

import { smock } from '@defi-wonderland/smock'
import { Match, Match__factory } from 'typechain-types'

const setup = async () => {
  const provider = ethers.provider

  const { userA: playerA, userB: playerB } = await getNamedAccounts()

  const MockedMatchFactory = await smock.mock<Match__factory>('Match')

  // PlayerA will be the owner of the match
  const MatchFactory: Match__factory = await ethers.getContractFactory('Match')
  const cardsToWin = 3
  const MatchContract: Match = await MatchFactory.deploy(playerA, cardsToWin)
  const match = MatchContract.connect(provider.getSigner(playerA))

  enum betOptions {
    higher = 0,
    lower = 1,
  }

  return {
    match,
    cardsToWin,
    MockedMatchFactory,
    playerA,
    playerB,
    provider,
    betOptions,
  }
}

describe('Match contract tests', () => {
  it('when a match is created, the contract will have a variable indicating the player`s address and how many cards to guess', async () => {
    // Given
    const { match, playerA, cardsToWin } = await setup()

    // When
    const player = await match.player()
    const cards = await match.cardsToWin()

    // Then
    expect(player).to.equal(playerA)
    expect(cards).to.equal(cardsToWin)
  })

  it('only match`s player can make a bet', async () => {
    // Given
    const { playerB, provider, match, betOptions } = await setup()

    // When
    const playerAmakesBet = await match.bet(betOptions.higher)
    const playerBmakesBet = match.connect(provider.getSigner(playerB)).bet(betOptions.higher)

    // Then
    await expect(playerAmakesBet).to.emit(match, 'BetResult')
    await expect(playerBmakesBet).to.be.revertedWith('OnlyPlayerCanCallThisFunction()')
  })

  it('if a match is over, the player cannot continue playing', async () => {
    // Given
    const { playerA, provider, MockedMatchFactory, betOptions } = await setup()

    const mockedMatchContract = MockedMatchFactory.connect(provider.getSigner(playerA))
    const mockedMatch = await mockedMatchContract.deploy(playerA, 3)

    await mockedMatch.setVariable('_gameOver', true)

    // When
    const playerAtriesToBet = mockedMatch
      .connect(provider.getSigner(playerA))
      .bet(betOptions.higher)

    // Then
    await expect(playerAtriesToBet).to.be.revertedWith('GameIsOver()')
  })
})
