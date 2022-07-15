import React from 'react'
import { ComponentColor, IComponentBaseProps } from '@/components/types'

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> &
  IComponentBaseProps & {
    bordered?: boolean
    label?: string
    prefix?: string
    suffix?: string
    color?: ComponentColor
  }
