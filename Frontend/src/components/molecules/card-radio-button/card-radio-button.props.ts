import { CardProps, RadioProps } from '@/components/atoms'
import { ReactNode } from 'react'

export type RadioCardButtonProps = Omit<RadioProps, 'size'> &
  CardProps & {
    children: ReactNode
    value: string
    onChange: (value: string) => void
  }
