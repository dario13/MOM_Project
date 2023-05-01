import { Navigate, Text } from '@/components/atoms/primitives'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { ButtonProps } from './button.props'

const buttonColor = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  success: 'btn-success',
  info: 'btn-info',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
}

const buttonSize = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const buttonShape = {
  square: 'btn-square',
  circle: 'btn-circle',
}

const buttonVariant = {
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  link: 'btn-link',
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (buttonProps: ButtonProps, ref): JSX.Element => {
    const {
      text,
      children,
      shape,
      size,
      variant,
      color,
      startIcon,
      endIcon,
      responsive = true,
      loading,
      active,
      disabled,
      dataTheme,
      className,
      onClick,
      href,
      ...props
    } = buttonProps
    const btnSize = size ? buttonSize[size] : ''
    const btnVariant = variant ? buttonVariant[variant] : ''
    const btnShape = shape ? buttonShape[shape] : ''
    const btnColor = color ? buttonColor[color] : ''

    const isLink = (href: string | undefined): href is string => {
      return href !== undefined
    }

    const conditionalClasses = clsx(
      'btn',
      className,
      {
        [btnSize]: size,
        [btnVariant]: variant,
        [btnShape]: shape,
        [btnColor]: color,
        'btn-xs md:btn-sm lg:btn-md xl:btn-lg': responsive,
        'btn-active': active,
        'btn-disabled': disabled,
        loading,
      },
      ((startIcon && !loading) || endIcon) && 'gap-2',
    )

    const classes = twMerge('btn', className, conditionalClasses)

    const renderButton = () => (
      <button
        {...props}
        onClick={onClick}
        ref={ref}
        data-testid="Button"
        data-theme={dataTheme}
        className={classes}
        disabled={disabled}
      >
        {startIcon && !loading && startIcon}
        {text || (children && <Text text={text}>{children}</Text>)}
        {endIcon && endIcon}
      </button>
    )

    return isLink(href) ? <Navigate href={href}>{renderButton()}</Navigate> : renderButton()
  },
)

ButtonComponent.displayName = 'Button'

export const Button = React.memo(ButtonComponent)
