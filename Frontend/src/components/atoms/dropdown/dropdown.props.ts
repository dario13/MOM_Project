import { ComponentBgColors, IComponentBaseProps } from '@/components/types'
import React, { ReactNode } from 'react'

export type Item = {
  label: string
  onClick: () => void
  active?: boolean
}

export type Menu = Item[]

export type DropdownProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    toggleElement: ReactNode
    content: Menu | ReactNode
    bgColor?: ComponentBgColors
    horizontal?: 'left' | 'center' | 'right'
    vertical?: 'top' | 'middle' | 'end'
    hover?: boolean
    open?: boolean
  }
