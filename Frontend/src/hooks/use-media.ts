import { screenSize } from '@/utils/screen-size'
import useMediaQuery from './use-media-query'

export type MediaQueryType = {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTabletOrMobile: boolean
}

export const useMedia = (): MediaQueryType => {
  const isMobile = useMediaQuery(screenSize.mobile)
  const isTablet = useMediaQuery(screenSize.tablet)
  const isTabletOrMobile = useMediaQuery(screenSize.tabletOrMobile)
  const isDesktop = useMediaQuery(screenSize.desktop)

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTabletOrMobile,
  }
}
