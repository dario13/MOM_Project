import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const initialStatusState = {
  isInstalled: false,
  isConnected: false,
}

const initialSignerState = {
  signer: undefined,
}

type StatusState = {
  isInstalled: boolean
  isConnected: boolean
  disconnect: () => void
}

type SignerState = {
  signer?: SignerWithAddress
}

type WalletState = StatusState & SignerState

const createStatusSlice: StateCreator<WalletState, [], [], StatusState> = (set) => ({
  ...initialStatusState,
  disconnect: () => set({ isConnected: false }),
})

const createSignerSlice: StateCreator<WalletState, [], [], SignerState> = (set) => ({
  ...initialSignerState,
  set,
})

export const useWalletStore = create<WalletState>()(
  persist(
    (arg1, arg2, arg3, arg4) => ({
      ...createStatusSlice(arg1, arg2, arg3, arg4 as any),
      ...createSignerSlice(arg1, arg2, arg3, arg4 as any),
    }),
    {
      name: 'wallet-storage',
      partialize: (state: WalletState) => ({
        isConnected: state.isConnected,
        isInstalled: state.isInstalled,
      }),
    },
  ),
)
