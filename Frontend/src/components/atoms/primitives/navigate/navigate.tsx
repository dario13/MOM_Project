import React from 'react'
import { Props } from './navigate.props'
import Link from 'next/link'

const NavigateComponent: React.FC<Props> = ({ href, className, children, asAButton }) => (
  <Link href={href}>
    {asAButton ? (
      <button className={className}>{children}</button>
    ) : (
      <div className={className}>{children}</div>
    )}
  </Link>
)

NavigateComponent.displayName = 'NavigateComponent'

export const Navigate = React.memo(NavigateComponent)
