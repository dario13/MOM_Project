import React from 'react'
import { Props } from './navigate.props'
import Link from 'next/link'

const Navigate: React.FC<Props> = ({ href, className, children, asAButton }) => (
  <Link href={href}>
    {asAButton ? (
      <button className={className}>{children}</button>
    ) : (
      <div className={className}>{children}</div>
    )}
  </Link>
)

export default Navigate
