import { useWallet, useWalletType } from '@/hooks/use-wallet'

export const useWalletMocked = (...options: Partial<useWalletType>[]) => {
  const mockUseWallet = useWallet as jest.Mock<useWalletType>

  const defaultValues: useWalletType = {
    connect: () => ({}),
    disconnect: () => ({}),
    isWalletInstalled: false,
    isWalletConnected: false,
    error: undefined,
    signer: undefined,
  }

  return mockUseWallet.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
