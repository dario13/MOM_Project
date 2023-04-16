import { create } from 'zustand'

const initialState = {
  momBalance: '0',
}

type ExchangeState = {
  momBalance: string
  setMomBalance: (momBalance: string) => void
}

export const useExchangeStore = create<ExchangeState>((set) => ({
  ...initialState,
  setMomBalance: (momBalance: string) => set({ momBalance }),
}))
