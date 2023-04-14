import env from '@/config/env'
import { useState } from 'react'

const { BLOCK_CONFIRMATIONS } = env

type HandleBlockchainOperationsType = {
  handleTransaction: (transactionPromise: Promise<any>) => Promise<void>
  handleCall: <T>(callPromise: Promise<T>) => Promise<T | undefined>
  operationInProgress: boolean
  error: boolean
}

export const useHandleBlockchainOperations = (): HandleBlockchainOperationsType => {
  const [operationInProgress, setOperationInProgress] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleTransaction = async (transactionPromise: Promise<any>) => {
    try {
      setOperationInProgress(true)
      const transaction = await transactionPromise
      await transaction.wait(BLOCK_CONFIRMATIONS)
      setOperationInProgress(false)
    } catch (error) {
      setError(true)
      setOperationInProgress(false)
    }
  }

  const handleCall = async <T>(callPromise: Promise<T>): Promise<T | undefined> => {
    try {
      setOperationInProgress(true)
      const result = await callPromise
      setOperationInProgress(false)
      return result
    } catch (error) {
      setError(true)
      setOperationInProgress(false)
    }
  }

  return { handleTransaction, handleCall, operationInProgress, error }
}
