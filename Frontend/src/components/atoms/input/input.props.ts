import React from 'react'
import { ComponentColor, ComponentSize, IComponentBaseProps } from '@/components/types'
import { IMask } from 'react-imask'

export type Mask = {
  options: IMask.AnyMaskedOptions
  onAccept?: (value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
  onComplete?: (value: string, mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
}

export type InputProps = IComponentBaseProps & {
  bordered?: boolean
  title?: string
  mask?: Mask
  value?: string
  defaultValue?: string
  placeholder?: string
  className?: string
  autoComplete?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  type?: string
  label?: string
  prefix?: string
  suffix?: string
  color?: ComponentColor
  inputSize?: ComponentSize
}
