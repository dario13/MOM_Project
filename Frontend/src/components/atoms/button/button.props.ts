import {
  ComponentColor,
  ComponentShape,
  ComponentSize,
  IComponentBaseProps,
} from '@/components/types'
import React, { ReactNode } from 'react'

export const buttonVariants = ['outline', 'link', 'ghost'] as const

export type ButtonVariantType = typeof buttonVariants[number]

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
  IComponentBaseProps & {
    text?: string
    shape?: ComponentShape
    size?: ComponentSize
    variant?: ButtonVariantType
    color?: ComponentColor
    responsive?: boolean
    animation?: boolean
    loading?: boolean
    active?: boolean
    children?: ReactNode
    startIcon?: ReactNode
    endIcon?: ReactNode
    href?: string
  }
