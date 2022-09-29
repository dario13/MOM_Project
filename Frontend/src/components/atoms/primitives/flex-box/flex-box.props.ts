import { IComponentBaseProps } from '@/components/types'
import React from 'react'

export type FlexBoxProps = IComponentBaseProps & {
  children?: React.ReactNode
  className?: string
  display?: 'flex' | 'inline-flex' | 'none'
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
  flexGrow?: '0' | '1'
  flexShrink?: '0' | '1'
  flexBasis?: string
  flex?: string
  /** **** Common Layout Props ********/
  padding?: string
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
  margin?: string
  marginTop?: string
  marginRight?: string
  marginBottom?: string
  marginLeft?: string
  width?: string
  height?: string
  maxWidth?: string
  maxHeight?: string
  minWidth?: string
  minHeight?: string
  gap?: string
  style?: React.CSSProperties
  ref?: React.Ref<HTMLDivElement>
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}
