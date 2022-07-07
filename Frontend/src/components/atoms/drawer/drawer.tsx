import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { DrawerProps } from './drawer.props'

import {} from './drawer.styles'

const Drawer = (drawerProps: DrawerProps) => {
  const { children, side, open, end, dataTheme, className, onClickOverlay, ...props } = drawerProps

  const classes = twMerge(
    'drawer',
    className,
    clsx({
      'drawer-end': end,
    }),
  )

  return (
    <div
      aria-expanded={open}
      {...props}
      data-theme={dataTheme}
      className={classes}
      data-testid="Drawer"
    >
      <input type="checkbox" className="drawer-toggle" checked={open} />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={onClickOverlay}></label>
        {side}
      </div>
    </div>
  )
}

Drawer.displayName = 'Drawer'

export { Drawer }
