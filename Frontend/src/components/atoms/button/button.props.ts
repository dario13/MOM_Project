import { MouseEventHandler, ReactNode } from 'react'
import {
  ComponentColor,
  ComponentShape,
  ComponentSize,
  IComponentBaseProps,
} from '@/components/types'

export enum buttonVariants {
  outline = 'outline',
  link = 'link',
  ghost = 'ghost',
}

export type ButtonProps = IComponentBaseProps & {
  text?: string
  shape?: ComponentShape
  size?: ComponentSize
  variant?: buttonVariants
  color?: ComponentColor
  responsive?: boolean
  animation?: boolean
  loading?: boolean
  active?: boolean
  disabled?: boolean
  children?: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  href?: string
  className?: string
}
