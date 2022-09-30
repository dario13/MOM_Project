import { Button, FlexBox, Image, Navbar } from '@/components/atoms'
import { DropdownHamburger } from '@/components/molecules/dropdown-hamburger'
import { useMedia } from '@/hooks/use-media'
import React from 'react'
import logoDesktop from '../../../../public/images/logo.png'
import logoMobile from '../../../../public/images/favicon/android-chrome-192x192.png'
import { Menu } from '@/components/atoms/dropdown/dropdown.props'
import { ChangeTheme } from '@/components/molecules/change-theme'
import { WalletButton } from '@/components/molecules/wallet-button'

const MainNavbar = () => {
  const { isMobile } = useMedia()

  const menuItems: Menu = [
    {
      label: 'Play',
      onClick: () => {
        console.log('Play')
      },
    },
  ]

  const renderLogo = () => {
    return isMobile ? (
      <Image src={logoMobile} width={50} height={50} title="logo" />
    ) : (
      <Image src={logoDesktop} width={120} height={60} title="logo" />
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
        {menuItems.map(({ label, onClick, active, color, endIcon, startIcon }) => (
          <Button
            color={color || 'ghost'}
            key={label}
            text={label}
            onClick={onClick}
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
