import { ComponentColor, ComponentSize, IComponentBaseProps } from '@/components/types'
import React from 'react'

export type LoaderProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    size?: ComponentSize
    animationColor?: ComponentColor
    backgroundColor?: ComponentColor
  }
