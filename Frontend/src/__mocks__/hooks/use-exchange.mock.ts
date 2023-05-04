import { useExchange, useExchangeType } from '@/hooks/use-exchange'

export const useExchangeMocked = (...options: Partial<useExchangeType>[]) => {
  const mockUseExchange = useExchange as jest.Mock<useExchangeType>

  const defaultValues: useExchangeType = {
    buyToken: jest.fn(),
    sellToken: jest.fn(),
    getStableCoinNeededToBuyMOM: jest.fn(),
    getStableCoinToReceiveFromMOM: jest.fn(),
  }

  return mockUseExchange.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
