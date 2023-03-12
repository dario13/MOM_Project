import { PriceFeedConsumer, PriceFeedConsumer__factory } from '@dario13/backend/typechain-types'
import env from '@/config/env'
import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from './use-wallet'

export type useEthPriceType = {
  ethUsdPrice: string
}

export const useEthPrice = (): useEthPriceType => {
  const { signer } = useWallet()
  const [ethUsdPrice, setEthUsdPrice] = useState('')
  const { PRICE_FEED_CONTRACT_ADDRESS } = env

  const getUsdPrice = useCallback(async () => {
    if (!signer) return

    const priceFeedConsumerContract: PriceFeedConsumer = PriceFeedConsumer__factory.connect(
      PRICE_FEED_CONTRACT_ADDRESS,
      signer,
    )

    const [price, decimalQuantity] = await priceFeedConsumerContract.getLatestPrice()

    const decimals = BigNumber.from(10).pow(decimalQuantity)

    const priceFormatted = Number(price.div(decimals)).toFixed(2).toString()

    setEthUsdPrice(priceFormatted)
  }, [signer])

  useEffect(() => {
    getUsdPrice()
  }, [getUsdPrice])

  return { ethUsdPrice }
}
