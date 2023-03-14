import { useExchangeStore } from '@/store/exchange/exchange.store'
import { convertEthToWei } from '@dario13/backend/utils/token-conversion'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import env from '@/config/env'

export type useExchangeType = {
  buyToken: (amount: string) => Promise<void>
  sellToken: (amount: string) => Promise<void>
  transactionInProgress: boolean
  momBalance: string
  error: boolean
}

export const useExchange = (): useExchangeType => {
  const { signer } = useWallet()
  const { momBalance, transactionInProgress, setMomBalance, setTransactionInProgress } =
    useExchangeStore()
  const { exchangeContract, momTokenContract } = useContractConnection()
  const { BLOCK_CONFIRMATIONS, EXCHANGE_CONTRACT_ADDRESS } = env
  const [error, setError] = useState<boolean>(false)

  const buyToken = async (amount: string) => {
    if (!signer) {
      return
    }

    try {
      setTransactionInProgress(true)

      const amountInWei = convertEthToWei(amount)

      const amountToBuy = { value: BigNumber.from(amountInWei) }

      const transaction = await exchangeContract.buyToken(amountToBuy)
      await transaction.wait(BLOCK_CONFIRMATIONS)
      setTransactionInProgress(false)
    } catch (error) {
      setError(true)
      setTransactionInProgress(false)
    }
  }

  const sellToken = async (amount: string) => {
    if (!signer) {
      return
    }
    try {
      setTransactionInProgress(true)

      ;(await momTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, amount)).wait(BLOCK_CONFIRMATIONS)

      console.log(await momTokenContract.allowance(signer.address, EXCHANGE_CONTRACT_ADDRESS))

      const transaction = await exchangeContract.sellToken(amount, signer.address)
      await transaction.wait(BLOCK_CONFIRMATIONS)
      setTransactionInProgress(false)
    } catch (error) {
      setError(true)
      setTransactionInProgress(false)
    }
  }

  const getMomBalance = useCallback(async () => {
    if (!signer) return

    const balance = await momTokenContract.balanceOf(signer.address)
    setMomBalance(balance.toString())
  }, [transactionInProgress, signer])

  useEffect(() => {
    getMomBalance()
  }, [getMomBalance])

  return { buyToken, sellToken, transactionInProgress, momBalance, error }
}
