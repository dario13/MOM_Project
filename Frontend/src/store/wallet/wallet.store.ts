import { Signer } from 'ethers'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { NullSigner } from './null-signer'
import { zeroAddress } from '@/utils/zero-address'

export type Wallet = {
  readonly isWalletInstalled: boolean
  readonly isAccountConnected: boolean
  readonly isAccountLoggedOut: boolean
  readonly signer: Signer
  readonly signerAddress: string
  readonly momBalance: string
}

export type WalletStoreState = Wallet & {
  setWalletInstalled: (isWalletInstalled: boolean) => void
  setAccountConnected: (isAccountConnected: boolean) => void
  setAccountLoggedOut: (isAccountLoggedOut: boolean) => void
  setSigner: (signer: Signer) => void
  setSignerAddress: (signerAddress: string) => void
  setMomBalance: (momBalance: string) => void
  disconnect: () => void
}

const initialState: Wallet = {
  isWalletInstalled: false,
  isAccountConnected: false,
  isAccountLoggedOut: false,
  signer: new NullSigner(),
  momBalance: '0',
  signerAddress: zeroAddress,
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
      setSigner: (signer: Signer) => set((state) => ({ ...state, signer })),
      setSignerAddress: (signerAddress: string) => set((state) => ({ ...state, signerAddress })),
      setMomBalance: (momBalance: string) => set((state) => ({ ...state, momBalance })),
      disconnect: () =>
        set({
          isWalletInstalled: true,
          isAccountConnected: false,
          isAccountLoggedOut: true,
          momBalance: '0',
          signer: new NullSigner(),
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
