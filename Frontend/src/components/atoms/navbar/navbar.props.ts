import React from 'react'
import { IComponentBaseProps } from '@/components/types'

export type NavbarProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    left?: React.ReactNode
    right?: React.ReactNode
    center?: React.ReactNode
    background?: boolean
  }
