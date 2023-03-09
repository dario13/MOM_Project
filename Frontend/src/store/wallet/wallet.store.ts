import create, { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

type Wallet = {
  readonly isInstalled: boolean
  readonly isConnected: boolean
  readonly signer?: SignerWithAddress
}

type WalletState = Wallet & {
  setInstalled: (isInstalled: boolean) => void
  setConnected: (isConnected: boolean) => void
  setSigner: (signer: SignerWithAddress) => void
  disconnect: () => void
}

const initialState: Wallet = {
  isInstalled: false,
  isConnected: false,
  signer: undefined,
}

const stateCreator: StateCreator<WalletState, [['zustand/persist', unknown]], []> = (set) => ({
  ...initialState,
  setInstalled: (isInstalled: boolean) => set((state) => ({ ...state, isInstalled })),
  setConnected: (isConnected: boolean) => set((state) => ({ ...state, isConnected })),
  setSigner: (signer: SignerWithAddress) => set((state) => ({ ...state, signer })),
  disconnect: () => set(initialState),
})

const persistConfig = {
  name: 'wallet',
}

const useWalletStore = create<WalletState>()(persist(stateCreator, persistConfig))

export { useWalletStore }
