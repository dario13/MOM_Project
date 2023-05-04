import { useTransactionStore } from '@/store/transaction/transaction.store'

export const useOperationInProgress = () => {
  const { operationInProgress } = useTransactionStore()

  return { operationInProgress }
}
