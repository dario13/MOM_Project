import {
  ComponentBgColors,
  ComponentColor,
  ComponentSize,
  IComponentBaseProps,
} from '@/components/types'
import React from 'react'

export type DividerProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    size?: ComponentSize
    color?: ComponentColor | ComponentBgColors
    vertical?: boolean
    type?: 'solid' | 'dashed' | 'dotted' | 'double'
  }
