import { ContractConnectionState, useContractConnection } from '@/hooks/use-contract-connection'

export const useContractConnectionMocked = (...options: Partial<ContractConnectionState>[]) => {
  const mockContractConnection = useContractConnection as jest.Mock<ContractConnectionState>

  const defaultValues: ContractConnectionState = {
    exchangeContract: {} as any,
    gameContract: {} as any,
    momTokenContract: {} as any,
    usdTokenContract: {} as any,
    matchContract: jest.fn(),
  }

  return mockContractConnection.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
