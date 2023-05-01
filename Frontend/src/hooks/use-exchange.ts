import { convertEthToWei } from '@dario13/backend/utils/token-conversion'
import { BigNumber } from 'ethers'
import { useWallet } from './use-wallet'
import { useContractConnection } from './use-contract-connection'
import env from '@/config/env'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'
import { useState } from 'react'

export type useExchangeType = {
  buyToken: (amount: string) => Promise<void>
  sellToken: (amount: string) => Promise<void>
  operationInProgress: boolean
}

export const useExchange = (): useExchangeType => {
  const { signerAddress, signer } = useWallet()
  const { exchangeContract, momTokenContract } = useContractConnection(signer)
  const [operationInProgress, setOperationInProgress] = useState<boolean>(false)

  const { EXCHANGE_CONTRACT_ADDRESS } = env
  const { handleTransaction } = useHandleBlockchainOperations()

  const buyToken = async (amount: string) => {
    setOperationInProgress(true)
    const amountInWei = convertEthToWei(amount)

    const amountToBuy = { value: BigNumber.from(amountInWei) }

    await handleTransaction(exchangeContract.buyToken(amountToBuy))
    setOperationInProgress(false)
  }

  const sellToken = async (amount: string) => {
    setOperationInProgress(true)
    await handleTransaction(momTokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, amount))

    await handleTransaction(exchangeContract.sellToken(amount, signerAddress))
    setOperationInProgress(false)
  }

  return { buyToken, sellToken, operationInProgress }
}
