import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts, upgrades } from 'hardhat'

import { setupNamedUsers } from './utils/setup-users'
import { smock } from '@defi-wonderland/smock'
import { networkConfig } from '../helper-hardhat-config'
import { GameV1__factory, Match, MOMTokenV1 } from 'typechain-types'

const setup = async () => {
  await deployments.fixture(['GameV1', 'MOMTokenV1', 'RandomUtils'])

  const provider = ethers.provider

  const config = networkConfig.default

  const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')

  const RandomUtilsContract = await ethers.getContract('RandomUtils')

  const GameFactory: GameV1__factory = await ethers.getContractFactory('GameV1')
  const GameContract = await upgrades.deployProxy(
    GameFactory,
    [config.ownerAddress, MomTokenContract.address, RandomUtilsContract.address],
    {
      initializer: 'initialize',
    },
  )

  const MockedGameFactory = await smock.mock<GameV1__factory>('GameV1')

  const contracts = {
    Game: GameContract,
    MOMToken: MomTokenContract,
  }

  const { userA, owner } = await getNamedAccounts()

  const users = await setupNamedUsers({ userA, owner }, contracts)

  // Put some ethers and tokens into the Game Contract
  const weiAmount = { value: ethers.utils.parseEther('100.0') }
  const MOMTokenAmount = 1000
  await users.owner.Game.fallback(weiAmount)
  await users.owner.MOMToken.transfer(GameContract.address, MOMTokenAmount)
  await users.owner.MOMToken.transfer(users.userA.address, MOMTokenAmount)

  // Declare the difficulty
  enum Difficulty {
    Easy = 0,
    Medium = 1,
    Hard = 2,
  }

  return {
    ...contracts,
    users,
    provider,
    MockedGameFactory,
    Difficulty,
  }
}

describe('Game contract tests', () => {
  it('should have the right owner', async () => {
    // Given
    const { Game } = await setup()
    const { owner } = await getNamedAccounts()

    // When
    const contractOwner = await Game.owner()

    // Then
    expect(contractOwner).to.equal(owner)
  })

  it('if a player gave the correct token allowance, then should be able to join a match', async () => {
    // Given
    const { Game, users, Difficulty } = await setup()
    const { userA: player } = users
    const difficulty = Difficulty.Easy

    const { tokensToPlay } = await player.Game.functions.getRules(difficulty)
    await player.MOMToken.approve(Game.address, tokensToPlay)

    // When
    await player.Game.createMatch(difficulty)
    const matchAddress = await player.Game.getLastMatch()
    const matchEvent = await Game.queryFilter(Game.filters.MatchCreated())
    const mostRecentMatch = matchEvent[0]?.args?.matchContract

    // Then
    expect(matchAddress).to.equal(mostRecentMatch)
  })

  it('if a player did not give the token allowance, then should not be able to create a match', async () => {
    // Given
    const { users, Difficulty } = await setup()
    const { userA: player } = users
    const difficulty = Difficulty.Easy

    // When
    const createMatch = player.Game.createMatch(difficulty)

    // Then
    await expect(createMatch).to.be.revertedWith('IncorrectTokenAllowance()')
  })

  it('if a player won a match then should be able to withdraw the prize', async () => {
    // Given
    const { users, MockedGameFactory, provider, Difficulty } = await setup()
    const { userA: player, owner } = users

    const playerAddress = player.address
    const difficulty = Difficulty.Easy
    const { tokensPrize } = await player.Game.functions.getRules(difficulty)

    // Mock the game contract and the match contract to make the player win
    const mockedGameContract = MockedGameFactory.connect(provider.getSigner(playerAddress))
    const mockedGame = await mockedGameContract.deploy()
    await owner.MOMToken.transfer(mockedGame.address, tokensPrize)
    const fakeMatch = await smock.fake<Match>('Match')
    fakeMatch.gameWon.returns(true)

    mockedGame.setVariable('matches', {
      [playerAddress]: [
        {
          matchContract: fakeMatch.address,
        },
      ],
    })
    mockedGame.setVariable('token', owner.MOMToken.address)

    // When
    const tokenBalanceBeforeClaimPrize = await player.MOMToken.balanceOf(playerAddress)
    await mockedGame.claimPrize()

    // Then
    const tokenBalanceAfterClaimPrize = await player.MOMToken.balanceOf(playerAddress)
    expect(tokenBalanceAfterClaimPrize).to.equal(tokenBalanceBeforeClaimPrize.add(tokensPrize))
  })

  it('if a player lost a match then should not be able to withdraw the prize', async () => {
    // Given
    const { users, MockedGameFactory, provider, Difficulty } = await setup()
    const { userA: player, owner } = users

    const playerAddress = player.address
    const difficulty = Difficulty.Easy
    const { tokensPrize } = await player.Game.functions.getRules(difficulty)

    // Mock the game contract and the match contract to make the player lose
    const mockedGameContract = MockedGameFactory.connect(provider.getSigner(playerAddress))
    const mockedGame = await mockedGameContract.deploy()
    await owner.MOMToken.transfer(mockedGame.address, tokensPrize)
    const fakeMatch = await smock.fake<Match>('Match')
    fakeMatch.gameWon.returns(false)

    mockedGame.setVariable('matches', {
      [playerAddress]: [
        {
          matchContract: fakeMatch.address,
        },
      ],
    })
    mockedGame.setVariable('token', owner.MOMToken.address)

    // When
    const tokenBalanceBeforeClaimPrize = await player.MOMToken.balanceOf(playerAddress)
    await mockedGame.claimPrize()

    // Then
    const tokenBalanceAfterClaimPrize = await player.MOMToken.balanceOf(playerAddress)
    expect(tokenBalanceAfterClaimPrize).to.equal(tokenBalanceBeforeClaimPrize)
  })
})
