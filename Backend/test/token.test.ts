import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { MOMToken } from 'typechain-types'
import { setupNamedUsers } from './utils/setup-users'

const setup = async () => {
  await deployments.fixture(['MOMToken'])

  const MomTokenContract: MOMToken = await ethers.getContract('MOMToken')

  const users = await setupNamedUsers(await getNamedAccounts(), { MOMToken: MomTokenContract })

  return {
    MomTokenContract,
    users,
  }
}

describe('MomToken contract tests', () => {
  it('should have the right owner', async () => {
    // Given
    const { MomTokenContract } = await setup()
    const { tokenOwner } = await getNamedAccounts()

    // When
    const contractOwner = await MomTokenContract.getOwner()

    // Then
    expect(contractOwner).to.equal(tokenOwner)
  })

  it('should assign the initial supply to the token owner', async () => {
    // Given
    const { users } = await setup()
    const { tokenOwner } = users
    const initialSupply = '1000000000000000000000'

    // When
    const balanceTokenOwner = await tokenOwner.MOMToken.balanceOf(tokenOwner.address)

    // Then
    expect(balanceTokenOwner).to.equal(initialSupply)
  })

  it('Given a userA with 0 MOMs balance and a userB with 10 MOMs, when userB transfers 2 MOMs to userA, then userA would have 2 MOMs and userB would have 8 MOMs  ', async () => {
    // Given
    const { users, MomTokenContract } = await setup()
    const { tokenOwner, userA, userB } = users

    await tokenOwner.MOMToken.transfer(userB.address, '10')

    // When
    await userB.MOMToken.transfer(userA.address, '2')

    // Then
    expect(await MomTokenContract.balanceOf(userA.address)).to.equal('2')
    expect(await MomTokenContract.balanceOf(userB.address)).to.equal('8')
  })
})
