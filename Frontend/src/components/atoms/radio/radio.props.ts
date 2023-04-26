import React from 'react'
import { ComponentColor, ComponentSize, IComponentBaseProps } from '@/components/types'

export type RadioProps = IComponentBaseProps & {
  value: string
  name?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  checked?: boolean
  size?: ComponentSize
  color?: ComponentColor
  disabled?: boolean
  href?: string
  className?: string
}
