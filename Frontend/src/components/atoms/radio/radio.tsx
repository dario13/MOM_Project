import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import { RadioProps } from './radio.props'

const radioColor = {
  primary: 'radio-primary',
  secondary: 'radio-secondary',
  accent: 'radio-accent',
  info: 'radio-info',
  success: 'radio-success',
  warning: 'radio-warning',
  error: 'radio-error',
  ghost: 'radio-ghost',
}

const radioSize = {
  xs: 'radio-xs',
  sm: 'radio-sm',
  md: 'radio-md',
  lg: 'radio-lg',
}

const RadioComponent = forwardRef<HTMLInputElement, RadioProps>(
  (radioProps: RadioProps, ref): JSX.Element => {
    const { color, size, value, dataTheme, className, ...props } = radioProps
    const radioColorClass = color ? radioColor[color] : ''
    const radioSizeClass = size ? radioSize[size] : ''

    const conditionalClasses = clsx('radio', className, {
      [radioSizeClass]: size,
      [radioColorClass]: color,
    })

    const classes = twMerge('radio', className, conditionalClasses)

    return (
      <input
        {...props}
        ref={ref}
        type="radio"
        value={value}
        data-theme={dataTheme}
        className={classes}
      />
    )
  },
)

RadioComponent.displayName = 'Radio'

export const Radio = React.memo(RadioComponent)
