import { WalletState, useWallet } from '@/hooks/use-wallet'
import { zeroAddress } from '@/utils/zero-address'

export const useWalletMocked = (...options: Partial<WalletState>[]) => {
  const mockUseWallet = useWallet as jest.Mock<WalletState>

  const defaultValues: WalletState = {
    connectWallet: jest.fn(),
    disconnectAccount: jest.fn(),
    isWalletInstalled: false,
    isAccountConnected: false,
    isAccountLoggedOut: false,
    operationInProgress: false,
    signer: {} as any,
    signerAddress: zeroAddress,
  }

  return mockUseWallet.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
