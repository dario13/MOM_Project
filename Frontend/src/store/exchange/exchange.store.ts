import { create } from 'zustand'

const initialState = {
  momBalance: '0',
  transactionInProgress: false,
}

type ExchangeState = {
  momBalance: string
  transactionInProgress: boolean
  setMomBalance: (momBalance: string) => void
  setTransactionInProgress: (transactionInProgress: boolean) => void
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  ...initialState,
  setMomBalance: (momBalance: string) => set({ momBalance }),
  setTransactionInProgress: (transactionInProgress: boolean) => set({ transactionInProgress }),
}))
