import { useMedia } from '@/hooks/use-media'
import clsx from 'clsx'
import React, { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../button'
import { DropdownProps, Item, Menu } from './dropdown.props'

const dropDownHorizontal = {
  left: 'dropdown-left',
  right: 'dropdown-right',
  center: 'dropdown-center',
}

const dropDownVertical = {
  top: 'dropdown-top',
  middle: 'dropdown-middle',
  end: 'dropdown-end',
}

const dropDownBg = {
  base100: 'bg-base-100',
  base200: 'bg-base-200',
  base300: 'bg-base-300',
  neutral: 'bg-neutral',
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (dropDownProps: DropdownProps, ref): JSX.Element => {
    const {
      toggleElement,
      content,
      horizontal = 'center',
      vertical = 'middle',
      bgColor = 'base100',
      hover,
      open,
      dataTheme,
      ...props
    } = dropDownProps

    const { isMobile } = useMedia()

    const itsAMenu = (content: Menu | ReactNode): content is Menu => {
      return Array.isArray(content)
    }

    const wrapperClasses = twMerge(
      'dropdown',
      clsx({
        [dropDownHorizontal[horizontal]]: horizontal,
        [dropDownVertical[vertical]]: vertical,
        'dropdown-hover': hover,
        'dropdown-open': open,
      }),
    )

    const dropdownMenuClasses = clsx({
      [dropDownBg[bgColor]]: bgColor,
      'dropdown-content menu shadow rounded-box w-max': itsAMenu,
    })

    const renderContent = (content: Menu | ReactNode): JSX.Element => {
      if (itsAMenu(content)) {
        return renderMenu(content)
      }

      return <>{content}</>
    }

    const renderMenu = (menuItems: Item[]): JSX.Element => {
      return (
        <ul className={dropdownMenuClasses} tabIndex={0} data-theme={dataTheme}>
          {menuItems.map((item, index) => (
            <li key={index}>
              {
                <Button
                  text={item.label}
                  href={item.href}
                  onClick={item.onClick}
                  startIcon={item.startIcon}
                  endIcon={item.endIcon}
                  color={item.color || 'ghost'}
                  responsive={false}
                  size={isMobile ? 'sm' : 'md'}
                />
              }
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div role="listbox" {...props} ref={ref} data-theme={dataTheme} className={wrapperClasses}>
        <label tabIndex={0}>{toggleElement}</label>
        <div className="dropdown-content">{renderContent(content)}</div>
      </div>
    )
  },
)

Dropdown.displayName = 'Dropdown'

export { Dropdown }
