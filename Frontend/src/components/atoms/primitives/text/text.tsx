import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { TextAlignmentType, TextProps } from './text.props'

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
  const { align, size = 'md', text, italic, bold, className, style, children, dataTheme } = props

  const conditionalClasses = {
    [textSize[size]]: size,
    'font-bold': bold,
    italic,
  }

  const classes = twMerge('text', className, clsx(conditionalClasses))

  const renderOnlyText = (): JSX.Element => (
    <span className={classes} ref={ref} style={style} data-testid="Text" data-theme={dataTheme}>
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
