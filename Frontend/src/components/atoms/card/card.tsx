import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { FlexBox } from '../primitives'
import { CardProps } from './card.props'

const cardColor = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  accent: 'bg-accent',
  warning: 'bg-warning',
  info: 'bg-info',
  error: 'bg-error',
  ghost: 'bg-ghost',
  neutral: 'bg-neutral',
  base100: 'bg-base-100',
  base200: 'bg-base-200',
  base300: 'bg-base-300',
}

const Card = React.forwardRef<HTMLDivElement, CardProps>((props: CardProps, ref): JSX.Element => {
  const { children, dataTheme, border, color = 'base100' } = props

  const conditionalClasses = clsx({
    [cardColor[color]]: color,
    'card-bordered': border,
    'shadow-xl': true,
  })

  const classes = twMerge('card', conditionalClasses)

  return (
    <FlexBox data-theme={dataTheme} className={classes} display="inline-flex" ref={ref}>
      {children}
    </FlexBox>
  )
})

Card.displayName = 'Card'

export { Card }
