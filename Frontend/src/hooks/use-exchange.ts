import env from '@/config/env'
import { useExchangeStore } from '@/store/exchange/exchange.store'
import {
  ExchangeV1,
  ExchangeV1__factory,
  MOMTokenV1,
  MOMTokenV1__factory,
} from '@dario13/backend/typechain-types'
import { convertEthToWei } from '@dario13/backend/utils/token-conversion'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from './use-wallet'

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
  const [error, setError] = useState<boolean>(false)

  const { EXCHANGE_CONTRACT_ADDRESS, MOM_TOKEN_CONTRACT_ADDRESS, BLOCK_CONFIRMATIONS } = env

  const buyToken = async (amount: string) => {
    if (!signer) {
      return
    }

    try {
      setTransactionInProgress(true)
      const exchangeContract: ExchangeV1 = ExchangeV1__factory.connect(
        EXCHANGE_CONTRACT_ADDRESS,
        signer,
      )

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
      const exchangeContract: ExchangeV1 = ExchangeV1__factory.connect(
        EXCHANGE_CONTRACT_ADDRESS,
        signer,
      )

      const momTokenContract: MOMTokenV1 = MOMTokenV1__factory.connect(
        MOM_TOKEN_CONTRACT_ADDRESS,
        signer,
      )

      await momTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, amount)

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

    const momTokenContract: MOMTokenV1 = MOMTokenV1__factory.connect(
      MOM_TOKEN_CONTRACT_ADDRESS,
      signer,
    )
    const balance = await momTokenContract.balanceOf(signer.address)
    setMomBalance(balance.toString())
  }, [transactionInProgress, signer])

  useEffect(() => {
    getMomBalance()
  }, [getMomBalance])

  return { buyToken, sellToken, transactionInProgress, momBalance, error }
}
