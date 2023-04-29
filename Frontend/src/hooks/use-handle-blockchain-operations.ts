import env from '@/config/env'
import { useState } from 'react'

const { BLOCK_CONFIRMATIONS } = env

type HandleBlockchainOperationsType = {
  handleTransaction: (transactionPromise: Promise<any>) => Promise<void>
  handleCall: <T>(callPromise: Promise<T>) => Promise<T | undefined>
  error: boolean
}

export const useHandleBlockchainOperations = (): HandleBlockchainOperationsType => {
  const [error, setError] = useState<boolean>(false)

  const handleTransaction = async (transactionPromise: Promise<any>) => {
    try {
      const transaction = await transactionPromise
      await transaction.wait(BLOCK_CONFIRMATIONS)
    } catch (error) {
      setError(true)
    }
  }

  const handleCall = async <T>(callPromise: Promise<T>): Promise<T | undefined> => {
    try {
      return await callPromise
    } catch (error) {
      setError(true)
    }
  }

  return { handleTransaction, handleCall, error }
}
