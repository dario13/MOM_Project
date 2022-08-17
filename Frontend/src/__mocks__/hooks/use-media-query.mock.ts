import { screenSize } from '@/utils/screen-size'

/**
 * More about this mock in this link: https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */

export const useMediaQueryMock = (screenSizeMatch?: keyof typeof screenSize) => {
  const querySize = screenSizeMatch ? screenSize[screenSizeMatch] : screenSize.desktop
  return Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query === querySize,
      media: '',
      onchange: null,
      addEventListener: () => ({}),
      removeEventListener: () => ({}),
      dispatchEvent: () => ({}),
    }),
  })
}
