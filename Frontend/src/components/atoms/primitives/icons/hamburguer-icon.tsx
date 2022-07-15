import React from 'react'

export const HamburguerIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={props.className ? props.className : 'h-6 w-6'}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
