import { MediaQueryType } from '@/hooks/use-media'
import { screenSize } from '@/utils/screen-size'
import { useMediaQueryMock } from './use-media-query.mock'

const sizeCorrelation = {
  isDesktop: 'desktop',
  isMobile: 'mobile',
  isTablet: 'tablet',
  isTabletOrMobile: 'tabletOrMobile',
}

const getDeviceName = (obj: MediaQueryType): keyof typeof screenSize => {
  const firstTrueElement = Object.keys(obj).find((i) => obj[i as keyof MediaQueryType] === true)
  return sizeCorrelation[firstTrueElement as keyof MediaQueryType] as keyof typeof screenSize
}

export const useMediaMocked = (...options: Partial<MediaQueryType>[]) => {
  const defaultValues: MediaQueryType = {
    isDesktop: false,
    isMobile: false,
    isTablet: false,
    isTabletOrMobile: false,
  }

  const getOptionsWithOptionChoosen = Object.assign({}, defaultValues, ...options)

  const device = getDeviceName(getOptionsWithOptionChoosen)

  useMediaQueryMock(device)

  return getOptionsWithOptionChoosen
}
