import React from 'react'
import { ComponentColor, ComponentSize, IComponentBaseProps } from '../../types'

type NativeTextProps = React.HTMLAttributes<HTMLSpanElement>

export const textAlignments = ['left', 'center', 'right', 'justify', 'start', 'end'] as const

export type TextAlignmentType = typeof textAlignments[number]

export type TextProps = Omit<NativeTextProps, 'color'> &
  IComponentBaseProps & {
    size?: ComponentSize
    color?: ComponentColor
    align?: TextAlignmentType
    bold?: boolean
    italic?: boolean
    text?: string
    children?: React.ReactNode
  }
