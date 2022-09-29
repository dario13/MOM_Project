import { FlexBox, Text } from '@/components/atoms'
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { InputProps } from './input.props'
import { useIMask } from 'react-imask'
import { useMergeRefs } from '@/hooks/use-merge-refs'

const inputColor = {
  primary: 'input-primary',
  secondary: 'input-secondary',
  accent: 'input-accent',
  success: 'input-success',
  info: 'input-info',
  warning: 'input-warning',
  error: 'input-error',
  ghost: 'input-ghost',
}

const inputSize = {
  xs: 'input-xs',
  sm: 'input-sm',
  md: 'input-md',
  lg: 'input-lg',
}

const preffixAndSuffixSize = {
  xs: 'input-group-xs',
  sm: 'input-group-sm',
  md: 'input-group-md',
  lg: 'input-group-lg',
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
      mask = { options: { mask: '' } },
      onChange,
      size = 'md',
      defaultValue,
      ...props
    } = inputProps

    const [opts, setOpts] = useState(mask.options)

    const {
      ref: imaskRef,
      value: inputMaskedValue,
      setValue,
    } = useIMask(opts, {
      onComplete(value, maskRef) {
        mask.onComplete && mask.onComplete(value, maskRef)
      },
      onAccept(value, maskRef) {
        mask.onAccept && mask.onAccept(value, maskRef)
      },
    })

    const mergedRefs = useMergeRefs(imaskRef, ref)

    useEffect(() => {
      setOpts(mask.options)

      return () => {
        setValue('')
      }
    }, [mask.options])

    const inpColor = color ? inputColor[color] : ''

    const conditionalInputClasses = clsx({
      [inpColor]: color,
      [inputSize[size]]: size,
      'input-bordered': bordered,
      'focus:outline-offset-0': true,
    })

    const conditionalPrexifAndSuffixClass = clsx({
      [preffixAndSuffixSize[size]]: size,
    })

    const inputClasses = twMerge('input input-group', conditionalInputClasses, className)
    const preffixAndSuffixClasses = twMerge('input-group', conditionalPrexifAndSuffixClass)

    return (
      <FlexBox gap="0.2rem">
        {label && <Text size={size} bold={true} text={label} />}
        <FlexBox flexDirection="row" className={preffixAndSuffixClasses} flex={'0'}>
          {prefix && <Text size={size} text={prefix} />}

          <input
            {...props}
            ref={mergedRefs}
            type={type}
            placeholder={placeholder}
            data-theme={dataTheme}
            data-testid="Input"
            value={value}
            className={inputClasses}
            onChange={mask.options.mask ? undefined : onChange}
            defaultValue={mask.options.mask ? inputMaskedValue : defaultValue}
          />

          {suffix && <Text size={size} text={suffix} />}
        </FlexBox>
      </FlexBox>
    )
  },
)

Input.displayName = 'Input'

export { Input }
