import { DataTheme } from '@/theme/types'
import {
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

export interface IComponentBaseProps {
  dataTheme?: DataTheme
}
