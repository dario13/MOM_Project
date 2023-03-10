import { useWallet, WalletState } from '@/hooks/use-wallet'

export const useWalletMocked = (...options: Partial<WalletState>[]) => {
  const mockUseWallet = useWallet as jest.Mock<WalletState>

  const defaultValues: WalletState = {
    connect: () => ({}),
    disconnect: () => ({}),
    isWalletInstalled: false,
    isWalletConnected: false,
    error: undefined,
    signer: undefined,
  }

  return mockUseWallet.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
