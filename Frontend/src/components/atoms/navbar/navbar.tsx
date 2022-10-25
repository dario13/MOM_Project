import React from 'react'
import { twMerge } from 'tailwind-merge'
import { NavbarProps } from './navbar.props'
import { FlexBox } from '../primitives'
import clsx from 'clsx'

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (navBarProps: NavbarProps, ref): JSX.Element => {
    const {
      left,
      center,
      right,
      className,
      dataTheme,
      style,
      background = true,
      ...props
    } = navBarProps
    const classes = twMerge(
      'navbar',
      className,
      clsx({
        'bg-base-100 shadow-xl rounded-box': background,
      }),
    )

    const renderSection = (section: string, children: React.ReactNode): JSX.Element => {
      return (
        <FlexBox
          data-theme={dataTheme}
          flexDirection="row"
          className={section}
          justifyContent="center"
          style={style}
          ref={ref}
        >
          {children}
        </FlexBox>
      )
    }

    return (
      <FlexBox flexDirection="row" {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {left && renderSection('navbar-start', left)}
        {center && renderSection('navbar-center', center)}
        {right && renderSection('navbar-end', right)}
      </FlexBox>
    )
  },
)

Navbar.displayName = 'Navbar'

export { Navbar }
