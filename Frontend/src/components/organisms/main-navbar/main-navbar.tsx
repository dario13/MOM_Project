import { Button, FlexBox, Image, Menu, Navbar, Navigate } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import React from 'react'
import logoDesktop from '../../../../public/images/logo.png'
import logoMobile from '../../../../public/images/favicon/android-chrome-192x192.png'
import { ChangeTheme, DropdownHamburger, WalletButton } from '@/components/molecules'

const MainNavbar = () => {
  const { isMobile } = useMedia()

  const menuItems: Menu = [
    {
      label: 'Play',
      href: '/play',
    },
    {
      label: 'Exchange',
      href: '/exchange',
    },
  ]

  const renderLogo = () => {
    return (
      <Navigate href="/" asAButton>
        <Image
          src={isMobile ? logoMobile : logoDesktop}
          width={isMobile ? 50 : 120}
          height={isMobile ? 50 : 60}
          alt="logo"
          title="logo"
        />
      </Navigate>
    )
  }

  const renderWalletButton = () => {
    return <WalletButton />
  }

  const renderLeftSideForMobile = () => {
    return (
      <>
        <DropdownHamburger menuItems={menuItems} />
        <ChangeTheme />
      </>
    )
  }

  const leftSideNavbar = () => {
    return (
      <FlexBox flexDirection="row" alignItems="flex-start" paddingLeft={isMobile ? '' : '3rem'}>
        {isMobile ? renderLeftSideForMobile() : renderLogo()}
      </FlexBox>
    )
  }

  const renderMenu = () => {
    return (
      <FlexBox flexDirection="row" paddingRight="1.5rem" gap="1rem" justifyContent="flex-end">
        {menuItems.map(({ label, onClick, href, active, color, endIcon, startIcon }) => (
          <Button
            color={color || 'ghost'}
            key={label}
            text={label}
            onClick={onClick}
            href={href}
            active={active}
            endIcon={endIcon}
            startIcon={startIcon}
            responsive={false}
          />
        ))}
        <ChangeTheme />
        {renderWalletButton()}
      </FlexBox>
    )
  }

  const rightSideNavbar = () => {
    return isMobile ? renderWalletButton() : renderMenu()
  }

  return (
    <>
      <Navbar
        left={leftSideNavbar()}
        center={isMobile ? renderLogo() : undefined}
        right={rightSideNavbar()}
        background={!isMobile}
        data-testid="MainNavBar"
      />
    </>
  )
}

MainNavbar.displayName = 'MainNavbar'

export { MainNavbar }
