import { IComponentBaseProps } from '@/components/types'
import React from 'react'

export type ModalProps = React.HTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    open?: boolean
    onClickBackdrop?: () => void
  }
