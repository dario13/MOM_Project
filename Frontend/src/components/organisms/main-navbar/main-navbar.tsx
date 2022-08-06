import { Button, Navbar } from '@/components/atoms'
import { DropdownHamburger } from '@/components/molecules/dropdown-hamburger'
import { useMedia } from '@/hooks/use-media'
import React from 'react'
import { MainNavbarProps } from './main-navbar.props'

const MainNavbar = (mainNavBarProps: MainNavbarProps) => {
  const { menuItems, dataTheme, logo } = mainNavBarProps
  const { isMobile } = useMedia()

  const renderLogo = () => {
    return logo
  }

  const renderDropDownHamburguer = () => {
    return <DropdownHamburger menuItems={menuItems} />
  }

  const leftSide = () => {
    return isMobile ? renderDropDownHamburguer() : renderLogo()
  }

  const rightSide = () => {
    return isMobile
      ? renderLogo()
      : menuItems.map(({ label, onClick, active, color, endIcon, startIcon }) => (
          <Button
            color={color || 'ghost'}
            key={label}
            text={label}
            onClick={onClick}
            active={active}
            endIcon={endIcon}
            startIcon={startIcon}
          />
        ))
  }

  return (
    <Navbar
      left={leftSide()}
      right={rightSide()}
      background={!isMobile}
      dataTheme={dataTheme}
      data-testid="MainNavBar"
    />
  )
}

MainNavbar.displayName = 'MainNavbar'

export { MainNavbar }
