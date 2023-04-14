import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type Wallet = {
  readonly isWalletInstalled: boolean
  readonly isAccountConnected: boolean
  readonly isAccountLoggedOut: boolean
  readonly signer?: SignerWithAddress | undefined
}

export type WalletStoreState = Wallet & {
  setWalletInstalled: (isWalletInstalled: boolean) => void
  setAccountConnected: (isAccountConnected: boolean) => void
  setAccountLoggedOut: (isAccountLoggedOut: boolean) => void
  setSigner: (signer: SignerWithAddress) => void
  disconnect: () => void
}

const initialState: Wallet = {
  isWalletInstalled: false,
  isAccountConnected: false,
  isAccountLoggedOut: false,
  signer: undefined,
}

const useWalletStore = create<WalletStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      setWalletInstalled: (isWalletInstalled: boolean) =>
        set((state) => ({ ...state, isWalletInstalled })),
      setAccountConnected: (isAccountConnected: boolean) =>
        set((state) => ({ ...state, isAccountConnected })),
      setAccountLoggedOut: (isAccountLoggedOut: boolean) =>
        set((state) => ({ ...state, isAccountLoggedOut })),
      setSigner: (signer: SignerWithAddress) => set((state) => ({ ...state, signer })),
      disconnect: () =>
        set({
          isWalletInstalled: true,
          isAccountConnected: false,
          isAccountLoggedOut: true,
          signer: undefined,
        }),
    }),
    {
      name: 'wallet',
      partialize: (state) => ({
        isWalletInstalled: state.isWalletInstalled,
        isAccountConnected: state.isAccountConnected,
        isAccountLoggedOut: state.isAccountLoggedOut,
      }),
    },
  ),
)

export { useWalletStore }
