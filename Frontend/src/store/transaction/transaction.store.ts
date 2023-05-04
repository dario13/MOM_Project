import { create } from 'zustand'

const initialState = {
  operationInProgress: false,
}

type TransactionState = {
  operationInProgress: boolean
  setOperationInProgress: (operationInProgress: boolean) => void
}

export const useTransactionStore = create<TransactionState>((set) => ({
  ...initialState,
  setOperationInProgress: (operationInProgress: boolean) => set({ operationInProgress }),
}))
