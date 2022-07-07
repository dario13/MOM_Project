import { FlexBox, Text } from '@/components/atoms'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { InputProps } from './input.props'

const inputColor = {
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  success: 'input-success',
  info: 'input-info',
  warning: 'input-warning',
  error: 'input-error',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (inputProps: InputProps, ref): JSX.Element => {
    const {
      value,
      label,
      prefix,
      suffix,
      placeholder,
      bordered = true,
      color,
      dataTheme,
      className,
      type,
      ...props
    } = inputProps

    const prefixOrSuffix = !!(prefix || suffix)
    const inpColor = color ? inputColor[color] : ''

    const conditionalClasses = clsx({
      [inpColor]: color,
      'input-bordered': bordered,
      'input-xs md:input-sm lg:input-md xl:input-lg': true,
      'focus:outline-offset-0': true,
    })

    const inputClasses = clsx('input', conditionalClasses, className)
    const prefixAndSuffixClasses = clsx(
      'input-group',
      'input-group-xs md:input-group-sm lg:input-group-md xl:input-group-lg',
    )

    return (
      <FlexBox>
        {label && <Text size="sm" bold={true} text={label} className="p-2" />}
        <FlexBox flexDirection="row" className={prefixOrSuffix ? prefixAndSuffixClasses : ''}>
          {prefix && <Text size="sm" text={prefix} />}
          <input
            {...props}
            ref={ref}
            type={type}
            value={value}
            placeholder={placeholder}
            data-theme={dataTheme}
            data-testid="Input"
            className={inputClasses}
          />
          {suffix && <Text size="sm" text={suffix} />}
        </FlexBox>
      </FlexBox>
    )
  },
)

Input.displayName = 'Input'

export { Input }
