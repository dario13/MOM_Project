import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { DividerProps } from './divider.props'

const horizontalDividerSizes = {
  xs: 'border-y-0.5',
  sm: 'border-y-1',
  md: 'border-y-2',
  lg: 'border-y-4',
}

const verticalDividerSizes = {
  xs: 'border-x-0.5',
  sm: 'border-x-1',
  md: 'border-x-2',
  lg: 'border-x-4',
}

const dividerColors = {
  primary: 'border-primary',
  secondary: 'border-secondary',
  ghost: 'border-ghost',
  info: 'border-info',
  success: 'border-success',
  accent: 'border-accent',
  warning: 'border-warning',
  error: 'border-error',
  neutral: 'border-neutral',
  base100: 'border-base-100',
  base200: 'border-base-200',
  base300: 'border-base-300',
}

const dividerTypes = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  double: 'border-double',
}

const Divider = (dividerProps: DividerProps): JSX.Element => {
  const {
    vertical = false,
    size = 'xs',
    color = 'base100',
    type = 'solid',
    dataTheme,
    children,
    className,
    ...props
  } = dividerProps

  const classes = twMerge(
    className,
    clsx({
      [verticalDividerSizes[size]]: vertical,
      [horizontalDividerSizes[size]]: !vertical,
      [dividerColors[color]]: color,
      [dividerTypes[type]]: type,
    }),
  )

  return (
    <div
      role="separator"
      {...props}
      data-theme={dataTheme}
      className={classes}
      data-testid="Divider"
    >
      {children}
    </div>
  )
}

Divider.displayName = 'Divider'

export { Divider }
