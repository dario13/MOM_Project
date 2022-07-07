import { IComponentBaseProps } from '@/components/types'
import React, { ReactNode } from 'react'

export type DrawerProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    side: ReactNode
    open?: boolean
    end?: boolean
    onClickOverlay?: () => void
  }
