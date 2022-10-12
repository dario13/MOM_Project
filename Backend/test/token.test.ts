import { expect } from './chai-setup'
import { deployments, ethers, getNamedAccounts } from 'hardhat'
import { MOMTokenV1 } from 'typechain-types'
import { setupNamedUsers } from './utils/setup-users'

const setup = async () => {
  await deployments.fixture(['MOMTokenV1'])

  const MomTokenContract: MOMTokenV1 = await ethers.getContract('MOMTokenV1')

  const users = await setupNamedUsers(await getNamedAccounts(), { MOMToken: MomTokenContract })

  return {
    MomTokenContract,
    users,
  }
}

describe('MomToken contract tests', () => {
  it('should assign the initial supply to the token owner', async () => {
    // Given
    const { users } = await setup()
    const { owner } = users
    const initialSupply = '1000000000000000000000'

    // When
    const balanceTokenOwner = await owner.MOMToken.balanceOf(owner.address)

    // Then
    expect(balanceTokenOwner).to.equal(initialSupply)
  })

  it('Given a userA with 0 MOM balance and a userB with 10 MOM, when userB transfers 2 MOM to userA, then userA would have 2 MOMs and userB would have 8 MOM', async () => {
    // Given
    const { users, MomTokenContract } = await setup()
    const { owner, userA, userB } = users

    await owner.MOMToken.transfer(userB.address, '10')

    // When
    await userB.MOMToken.transfer(userA.address, '2')

    // Then
    expect(await MomTokenContract.balanceOf(userA.address)).to.equal('2')
    expect(await MomTokenContract.balanceOf(userB.address)).to.equal('8')
  })

  it('Given a userA with approved 10 MOM from userB, the balance of userA after the transfer should be 10 MOM', async () => {
    // Given
    const { users, MomTokenContract } = await setup()
    const { owner, userA, userB } = users

    await owner.MOMToken.transfer(userB.address, '10')

    // When
    await userB.MOMToken.approve(userA.address, '10')
    await userA.MOMToken.transferFrom(userB.address, userA.address, '10')

    // Then
    expect(await MomTokenContract.balanceOf(userA.address)).to.equal('10')
    expect(await MomTokenContract.balanceOf(userB.address)).to.equal('0')
  })

  it('Given a userA with approved 10 MOM from userB, when userA tries to transfer 11 MOM from userB, then the transaction should fail', async () => {
    // Given
    const { users } = await setup()
    const { owner, userA, userB } = users

    await owner.MOMToken.transfer(userB.address, '10')

    // When
    await userB.MOMToken.approve(userA.address, '10')

    // Then
    await expect(
      userA.MOMToken.transferFrom(userB.address, userA.address, '11'),
    ).to.be.revertedWith('ERC20: insufficient allowance')
  })
})
