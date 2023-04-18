import { ComponentBgColors, ComponentColor, IComponentBaseProps } from '@/components/types'
import { MouseEventHandler, ReactNode } from 'react'

export type Item = {
  label: string
  onClick?: () => void
  href?: string
  color?: ComponentColor
  startIcon?: ReactNode
  endIcon?: ReactNode
  active?: boolean
}

export type Menu = Item[]

export type DropdownProps = IComponentBaseProps & {
  toggleElement: ReactNode
  content: Menu | ReactNode
  bgColor?: ComponentBgColors
  horizontal?: 'left' | 'center' | 'right'
  vertical?: 'top' | 'middle' | 'end'
  hover?: boolean
  open?: boolean
  tabIndex?: number
  onClick?: MouseEventHandler<HTMLDivElement>
}
