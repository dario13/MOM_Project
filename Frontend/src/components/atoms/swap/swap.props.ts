import { IComponentBaseProps } from '@/components/types'
import React, { ReactNode } from 'react'

export type SwapProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  IComponentBaseProps & {
    onElement: ReactNode | ReactNode[]
    offElement: ReactNode | ReactNode[]
    active?: boolean
    rotate?: boolean
    flip?: boolean
  }
