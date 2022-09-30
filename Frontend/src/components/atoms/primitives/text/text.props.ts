import React from 'react'
import { ComponentSize, IComponentBaseProps } from '../../../types'

type NativeTextProps = React.HTMLAttributes<HTMLSpanElement>

export const textAlignments = ['left', 'center', 'right', 'justify', 'start', 'end'] as const

export type TextAlignmentType = typeof textAlignments[number]

export type TextProps = Omit<NativeTextProps, 'color'> &
  IComponentBaseProps & {
    size?: 'IIIxl' | 'IIxl' | 'xl' | ComponentSize
    align?: TextAlignmentType
    bold?: boolean
    italic?: boolean
    text?: string
    children?: React.ReactNode
  }
