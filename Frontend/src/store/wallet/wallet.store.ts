import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type Wallet = {
  readonly isWalletInstalled: boolean
  readonly isWalletConnected: boolean
  readonly signer?: SignerWithAddress
}

export type WalletStoreState = Wallet & {
  setWalletInstalled: (isWalletInstalled: boolean) => void
  setWalletConnected: (isWalletConnected: boolean) => void
  setSigner: (signer: SignerWithAddress) => void
  disconnect: () => void
}

const initialState: Wallet = {
  isWalletInstalled: false,
  isWalletConnected: false,
  signer: undefined,
}

const stateCreator: StateCreator<WalletStoreState, [['zustand/persist', unknown]], []> = (set) => ({
  ...initialState,
  setWalletInstalled: (isWalletInstalled: boolean) =>
    set((state) => ({ ...state, isWalletInstalled })),
  setWalletConnected: (isWalletConnected: boolean) =>
    set((state) => ({ ...state, isWalletConnected })),
  setSigner: (signer: SignerWithAddress) => set((state) => ({ ...state, signer })),
  disconnect: () => set(initialState),
})

const persistConfig = {
  name: 'wallet',
}

const useWalletStore = create<WalletStoreState>()(persist(stateCreator, persistConfig))

export { useWalletStore }
