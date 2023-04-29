import { BigNumber } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'

export type useEthPriceType = {
  ethUsdPrice: string
}

export const useEthPrice = (): useEthPriceType => {
  const { isAccountConnected, signer } = useWallet()
  const [ethUsdPrice, setEthUsdPrice] = useState('0')
  const { priceFeedConsumerContract } = useContractConnection(signer)
  const { handleCall } = useHandleBlockchainOperations()

  const getUsdPrice = useCallback(async () => {
    if (!isAccountConnected) return

    const [price, decimalQuantity] = (await handleCall(
      priceFeedConsumerContract.getLatestPrice(),
    )) || [BigNumber.from(0), 1]

    const decimals = BigNumber.from(10).pow(decimalQuantity)

    const priceFormatted = Number(price.div(decimals)).toFixed(2).toString()

    setEthUsdPrice(priceFormatted)
  }, [isAccountConnected])

  useEffect(() => {
    getUsdPrice()
  }, [getUsdPrice])

  return { ethUsdPrice }
}
