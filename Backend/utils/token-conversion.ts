import { BigNumber, ethers } from 'ethers'

/**
 * Returns 1,000,000,000,000,000,000
 */
const getOneEthInWei = () => {
  return BigNumber.from(10).pow(18)
}

/**
 * Returns 100,000,000,000,000
 */
const getOneMomInWei = () => {
  return BigNumber.from(10).pow(14)
}

/**
 * Given a wei amount, returns the equivalent amount in MOM.
 */
const convertWeiToMom = (wei: BigNumber | string | number) => {
  const mod = BigNumber.from(wei).mod(getOneMomInWei())
  if (mod.gt(0)) {
    throw new Error(`Invalid wei amount: ${wei}. It must be a multiple of ${getOneMomInWei()}`)
  }
  return BigNumber.from(wei).div(getOneMomInWei())
}

/**
 * Given a MOM amount, returns the equivalent amount in wei.
 */
const convertMomToWei = (mom: BigNumber | string | number) => {
  return BigNumber.from(mom).mul(getOneMomInWei())
}

/**
 * Given a ETH amount, returns the equivalent amount in wei.
 */
const convertEthToWei = (ethAmount: BigNumber | string | number) => {
  if (Number(ethAmount) === 0) {
    return '0'
  }
  return ethers.utils.parseUnits(ethAmount.toString(), 'ether')
}

/**
 * Given a wei amount, returns the equivalent amount in ETH.
 */
const convertWeiToEth = (weiAmount: BigNumber | string | number) => {
  if (Number(weiAmount) === 0) {
    return '0'
  }
  return ethers.utils.formatEther(weiAmount.toString())
}

/**
 * Given a MOM token amount, returns the equivalent amount in ETH.
 */
const convertMomToEth = (momAmount: BigNumber | string | number) => {
  if (!momAmount) return

  return ethers.utils.formatEther(convertMomToWei(momAmount))
}

/**
 * Given a ETH amount, returns the equivalent amount in MOM.
 */
const convertEthToMom = (ethAmount: BigNumber | string | number) => {
  if (!ethAmount) return
  return convertWeiToMom(convertEthToWei(ethAmount))
}

export {
  convertMomToEth,
  convertEthToMom,
  convertWeiToEth,
  convertEthToWei,
  getOneEthInWei,
  getOneMomInWei,
  convertWeiToMom,
  convertMomToWei,
}
