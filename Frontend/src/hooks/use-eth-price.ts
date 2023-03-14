import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'

export type useEthPriceType = {
  ethUsdPrice: string
}

export const useEthPrice = (): useEthPriceType => {
  const { signer } = useWallet()
  const [ethUsdPrice, setEthUsdPrice] = useState('0')
  const { priceFeedConsumerContract } = useContractConnection()

  useEffect(() => {
    const getUsdPrice = async () => {
      if (!signer) return '0'

      const [price, decimalQuantity] = await priceFeedConsumerContract.getLatestPrice()

      const decimals = BigNumber.from(10).pow(decimalQuantity)

      const priceFormatted = Number(price.div(decimals)).toFixed(2).toString()

      setEthUsdPrice(priceFormatted)
    }

    getUsdPrice()
  })

  return { ethUsdPrice }
}
