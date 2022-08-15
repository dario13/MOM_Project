import create from 'zustand'
import { persist } from 'zustand/middleware'

const initialState = {
  isConnected: false,
}

type WalletState = {
  isConnected: boolean
  disconnected: () => void
  connected: () => void
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      ...initialState,
      disconnected: () => set((state) => ({ ...state, isConnected: false })),
      connected: () => set((state) => ({ ...state, isConnected: true })),
    }),
    {
      name: 'wallet-storage',
    },
  ),
)
