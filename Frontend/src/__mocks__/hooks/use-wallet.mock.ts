import { WalletState, useWallet } from '@/hooks/use-wallet'

export const useWalletMocked = (...options: Partial<WalletState>[]) => {
  const mockUseWallet = useWallet as jest.Mock<WalletState>

  const defaultValues: WalletState = {
    connectWallet: () => ({}),
    disconnectWallet: () => ({}),
    isWalletInstalled: false,
    isWalletConnected: false,
    signer: undefined,
  }

  return mockUseWallet.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
