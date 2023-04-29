import { WalletBalance, useWalletBalance } from '@/hooks/use-wallet-balance'

export const useWalletBalanceMocked = (...options: Partial<WalletBalance>[]) => {
  const mockUseWalletBalance = useWalletBalance as jest.Mock<ReturnType<typeof useWalletBalance>>

  const defaultValues: WalletBalance = {
    momBalance: '100',
  }

  return mockUseWalletBalance.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
