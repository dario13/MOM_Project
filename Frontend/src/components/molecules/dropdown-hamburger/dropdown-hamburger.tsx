import { Button, Dropdown, Swap } from '@/components/atoms'
import { CloseIcon, HamburguerIcon } from '@/components/atoms/primitives/icons'
import React, { useState } from 'react'
import { DropdownHamburgerProps } from './dropdown-hamburger.props'
import debounce from 'lodash.debounce'

const DropdownHamburger = (props: DropdownHamburgerProps) => {
  const { menuItems, dataTheme, open = false } = props
  const [isOpen, setIsOpen] = useState(open)

  const handleClick = () => {
    setIsOpen(!isOpen)
    if (isOpen) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }
  }

  const debouncedHandleClick = debounce(handleClick, 5)

  return (
    <Dropdown
      tabIndex={0}
      toggleElement={
        <Button
          onClick={() => {
            debouncedHandleClick()
          }}
          color="ghost"
        >
          <Swap onElement={<CloseIcon />} offElement={<HamburguerIcon />} active={isOpen} rotate />
        </Button>
      }
      content={menuItems}
      dataTheme={dataTheme}
      open={isOpen}
      data-testid="DropdownHamburger"
    />
  )
}

DropdownHamburger.displayName = 'DropdownHamburger'

export { DropdownHamburger }
