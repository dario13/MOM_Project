import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { SwapProps } from './swap.props'

const Swap = React.forwardRef<HTMLLabelElement, SwapProps>((swapProps, ref): JSX.Element => {
  const { onElement, offElement, active, rotate, flip, dataTheme, className, ...props } = swapProps
  const classes = twMerge(
    'swap',
    className,
    clsx({
      'swap-active': active,
      'swap-rotate': rotate,
      'swap-flip': flip,
    }),
  )

  const onEl = <div className="swap-on">{onElement}</div>

  const offEl = <div className="swap-off">{offElement}</div>

  return (
    <label {...props} data-theme={dataTheme} className={classes} ref={ref} data-testid="Swap">
      {!active && <input type="checkbox" />}
      {onEl}
      {offEl}
    </label>
  )
})

Swap.displayName = 'Swap'

export { Swap }
