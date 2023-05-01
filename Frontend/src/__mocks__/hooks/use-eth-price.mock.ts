import { useEthPrice, useEthPriceType } from '@/hooks/use-eth-price'

export const useEthPriceMocked = (...options: Partial<useEthPriceType>[]) => {
  const mockEthPrice = useEthPrice as jest.Mock<useEthPriceType>

  const defaultValues: useEthPriceType = {
    ethUsdPrice: '2000',
  }

  return mockEthPrice.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
