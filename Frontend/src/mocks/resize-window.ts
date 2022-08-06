import { minimumScreenResolution } from '@/utils/screen-size'
import { act } from 'react-dom/test-utils'

export const resizeWindow = (screenType: keyof typeof minimumScreenResolution) => {
  const { x, y } = minimumScreenResolution[screenType]
  window.innerWidth = x
  window.innerHeight = y
  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
}
