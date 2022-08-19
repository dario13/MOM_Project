import { Button, FlexBox, Image, Navbar } from '@/components/atoms'
import { DropdownHamburger } from '@/components/molecules/dropdown-hamburger'
import { useMedia } from '@/hooks/use-media'
import React, { useState } from 'react'
import logo from '../../../../public/images/logo.png'
import { Menu } from '@/components/atoms/dropdown/dropdown.props'
import { AlertDialog } from '@/components/molecules'
import { useWallet } from '@/hooks/use-wallet'
import { ChangeTheme } from '@/components/molecules/change-theme'

const actionWalletButtonText = {
  start: 'Start!',
  connected: 'Connected',
}

const notWalletInstalledTitle = 'No wallet installed'
const notWalletInstalledMessage = 'Please install Metamask'

const disconnectWalletTitle = 'Your wallet is connected'
const disconnectWalletMessage =
  "Do you want to disconnect? You won't be able to use the app but you won't lose your tokens and you can always connect again."

const MainNavbar = () => {
  const { isMobile } = useMedia()
  const { connect, disconnect, isWalletInstalled, isWalletConnected } = useWallet()
  const [showModalInstallWallet, setShowModalInstallWallet] = useState(false)
  const [showModalDisconnectWallet, setShowModalDisconnectWallet] = useState(false)

  const onClickStart = () => {
    if (isWalletConnected) {
      return
    }
    if (!isWalletInstalled) {
      return setShowModalInstallWallet(true)
    }
    connect()
  }

  const onClickConnected = () => {
    setShowModalDisconnectWallet(true)
  }

  const onClickDisconnect = () => {
    disconnect()
    setShowModalDisconnectWallet(false)
  }

  const menuItems: Menu = [
    {
      label: isWalletConnected ? actionWalletButtonText.connected : actionWalletButtonText.start,
      color: isWalletConnected ? 'success' : 'primary',
      onClick: isWalletConnected ? onClickConnected : onClickStart,
    },
  ]

  const renderLogo = () => {
    return <Image src={logo} width={120} height={60} title="logo" />
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
      </FlexBox>
    )
  }

  const rightSideNavbar = () => {
    return isMobile ? renderLogo() : renderMenu()
  }

  const modalInstallWallet = () => {
    return (
      <AlertDialog
        visible={showModalInstallWallet}
        actions={{ main: { text: 'Ok', onPress: () => setShowModalInstallWallet(false) } }}
        title={notWalletInstalledTitle}
        message={notWalletInstalledMessage}
      />
    )
  }

  const modalDisconnectWallet = () => {
    return (
      <AlertDialog
        visible={showModalDisconnectWallet}
        actions={{
          main: { text: 'Disconnect', color: 'error', onPress: () => onClickDisconnect() },
          dismiss: { text: 'Cancel', onPress: () => setShowModalDisconnectWallet(false) },
        }}
        title={disconnectWalletTitle}
        message={disconnectWalletMessage}
      />
    )
  }

  return (
    <>
      <Navbar
        left={leftSideNavbar()}
        right={rightSideNavbar()}
        background={!isMobile}
        data-testid="MainNavBar"
      />
      {modalInstallWallet()}
      {modalDisconnectWallet()}
    </>
  )
}

MainNavbar.displayName = 'MainNavbar'

export { MainNavbar, actionWalletButtonText }
