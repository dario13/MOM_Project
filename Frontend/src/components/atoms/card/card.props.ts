import { ComponentBgColors, ComponentColor, IComponentBaseProps } from '@/components/types'
import React from 'react'

export type CardProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> &
  IComponentBaseProps & {
    children: React.ReactNode
    color?: ComponentColor | ComponentBgColors
    border?: boolean
  }
