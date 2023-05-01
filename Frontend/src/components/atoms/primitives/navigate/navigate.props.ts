import { LinkProps } from 'next/link'
import React from 'react'

export type Props = LinkProps & {
  className?: string
  asAButton?: boolean
  children?: React.ReactNode
}
