import { IComponentBaseProps } from '@/components/types'
import React from 'react'

export type FlexBoxProps = IComponentBaseProps & {
  children?: any
  className?: string
  display?: 'flex' | 'inline-flex'
  /** **** Container Props ********/
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline'
  /** **** Child Props ********/
  flexGrow?: string
  flexShrink?: string
  flexBasis?: string
  flex?: string
  /** **** Common Layout Props ********/
  padding?: string
  margin?: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  gap?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
}
