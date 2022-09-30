import React from 'react'
import { ComponentColor, ComponentSize, IComponentBaseProps } from '@/components/types'
import { IMask } from 'react-imask'

type Mask = {
  options: IMask.AnyMaskedOptions
  onAccept?: (value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
  onComplete?: (value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
}

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'color'> &
  IComponentBaseProps & {
    bordered?: boolean
    mask?: Mask
    label?: string
    prefix?: string
    suffix?: string
    color?: ComponentColor
    size?: ComponentSize
  }
