import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import env from '@/config/env'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'
import { useTransactionStore } from '@/store/transaction/transaction.store'

export type useExchangeType = {
  buyToken: (amountMOMToBuy: string, maxStableCoinToPay: string) => Promise<void>
  sellToken: (amountMOMToSell: string, minStableCoinToReceive: string) => Promise<void>
  getStableCoinNeededToBuyMOM: (amountMOMToBuy: string) => Promise<string | undefined>
  getStableCoinToReceiveFromMOM: (amountStableCoinToSell: string) => Promise<string | undefined>
}

const { EXCHANGE_CONTRACT_ADDRESS } = env

export const useExchange = (): useExchangeType => {
  const { signer } = useWallet()
  const { exchangeContract, momTokenContract, usdTokenContract } = useContractConnection(signer)
  const { handleTransaction, handleCall } = useHandleBlockchainOperations()
  const { setOperationInProgress } = useTransactionStore()

  // Buy token
  const buyToken = async (amountMOMToBuy: string, maxStableCoinToPay: string) => {
    if (!signer) {
      return
    }
    setOperationInProgress(true)

    // Approve the exchange to spend the stable coin
    await handleTransaction(usdTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, maxStableCoinToPay))

    await handleTransaction(exchangeContract.buyTokens(amountMOMToBuy, maxStableCoinToPay))
    setOperationInProgress(false)
  }

  const sellToken = async (amountMOMToSell: string, minStableCoinToReceive: string) => {
    if (!signer) {
      return
    }
    setOperationInProgress(true)
    await handleTransaction(momTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, amountMOMToSell))

    await handleTransaction(exchangeContract.sellTokens(amountMOMToSell, minStableCoinToReceive))
    setOperationInProgress(false)
  }

  const getStableCoinNeededToBuyMOM = async (amountMOMToBuy: string) => {
    if (!signer || !amountMOMToBuy) return

    const stableCoinNeeded = await handleCall(
      exchangeContract.getStableCoinAmountOut(amountMOMToBuy),
    )

    const extraToExceedTheMin = 1

    return stableCoinNeeded?.add(extraToExceedTheMin)?.toString()
  }

  const getStableCoinToReceiveFromMOM = async (amountMOMToSell: string) => {
    if (!signer || !amountMOMToSell) return

    const stableCoinToReceive = await handleCall(
      exchangeContract.getStableCoinAmountOut(amountMOMToSell),
    )

    return stableCoinToReceive?.toString()
  }

  return {
    buyToken,
    sellToken,
    getStableCoinNeededToBuyMOM,
    getStableCoinToReceiveFromMOM,
  }
}
