import { useTheme } from '@/hooks/use-theme'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { TextAlignmentType, TextProps } from './text.props'

const textColor = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning',
  error: 'text-error',
}

const textSize = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

const textAlignment = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
  start: 'text-start',
  end: 'text-end',
}

const Text = forwardRef<HTMLSpanElement, TextProps>((props: TextProps, ref): JSX.Element => {
  const {
    align,
    size = 'md',
    color = 'primary',
    text,
    italic,
    bold,
    className,
    style,
    children,
  } = props
  const { theme } = useTheme()

  const conditionalClasses = {
    [textColor[color]]: color,
    [textSize[size]]: size,
    'font-bold': bold,
    italic,
  }

  const classes = twMerge('text', className, clsx(conditionalClasses))

  const renderOnlyText = (): JSX.Element => (
    <span className={classes} data-theme={theme} ref={ref} style={style} data-testid="Text">
      {text || children}
    </span>
  )

  const renderTextAligned = (align: TextAlignmentType): JSX.Element => (
    <p className={textAlignment[align]}>{renderOnlyText()}</p>
  )

  return <>{align ? renderTextAligned(align) : renderOnlyText()}</>
})

Text.displayName = 'Text'

export { Text }
