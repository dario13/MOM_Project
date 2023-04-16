import { convertEthToWei } from '@dario13/backend/utils/token-conversion'
import { BigNumber } from 'ethers'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import env from '@/config/env'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'

export type useExchangeType = {
  buyToken: (amount: string) => Promise<void>
  sellToken: (amount: string) => Promise<void>
}

export const useExchange = (): useExchangeType => {
  const { exchangeContract, momTokenContract } = useContractConnection()
  const { signerAddress } = useWallet()
  const { EXCHANGE_CONTRACT_ADDRESS } = env
  const { handleTransaction } = useHandleBlockchainOperations()

  const buyToken = async (amount: string) => {
    const amountInWei = convertEthToWei(amount)

    const amountToBuy = { value: BigNumber.from(amountInWei) }

    await handleTransaction(exchangeContract.buyToken(amountToBuy))
  }

  const sellToken = async (amount: string) => {
    await handleTransaction(momTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, amount))

    await handleTransaction(exchangeContract.sellToken(amount, signerAddress))
  }

  return { buyToken, sellToken }
}
