import { DataTheme } from '@/contexts/theme/theme-type'
import {
  bgColors,
  brandColors,
  componentColors,
  componentPositions,
  componentShapes,
  componentSizes,
} from './constants'

export type ComponentSize = typeof componentSizes[number]
export type ComponentColor = typeof componentColors[number]
export type ComponentPosition = typeof componentPositions[number]
export type ComponentShape = typeof componentShapes[number]
export type ComponentBrandColors = typeof brandColors[number]
export type ComponentBgColors = typeof bgColors[number]

export interface IComponentBaseProps {
  dataTheme?: DataTheme
}
