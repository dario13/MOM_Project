import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { LoaderProps } from './loader.props'

const loaderBackgroundColor = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  accent: 'text-accent',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
  ghost: 'text-ghost',
}

const loaderAnimationColor = {
  primary: 'border-t-primary',
  secondary: 'border-t-secondary',
  accent: 'border-t-accent',
  success: 'border-t-success',
  info: 'border-t-info',
  warning: 'border-t-warning',
  error: 'border-t-error',
  ghost: 'border-t-ghost',
}

const loaderSize = {
  xs: 'w-4 h-4 border-2',
  sm: 'w-8 h-8 border-4',
  md: 'w-16 h-16 border-8',
  lg: 'w-32 h-32 border-16',
}

const Loader = (props: LoaderProps) => {
  const { size = 'md', backgroundColor = 'primary', animationColor = 'secondary' } = props

  const conditionalClasses = {
    [loaderBackgroundColor[backgroundColor]]: backgroundColor,
    [loaderAnimationColor[animationColor]]: animationColor,
    [loaderSize[size]]: size,
    'animate-spin': true,
    'rounded-full': true,
    'border-solid': true,
  }

  const classes = twMerge('loader', clsx(conditionalClasses))

  return <div data-testid="Loader" className={classes}></div>
}

Loader.displayName = 'Loader'

export { Loader }
