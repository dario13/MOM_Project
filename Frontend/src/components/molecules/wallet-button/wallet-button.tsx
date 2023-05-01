import React, { useState } from 'react'
import { Button } from '@/components/atoms'
import { useWallet } from '@/hooks/use-wallet'
import { AlertDialog } from '../alert-dialog'
import { useWalletBalance } from '@/hooks/use-wallet-balance'

const actionWalletButtonText = {
  start: 'Start!',
  balance: 'MOM',
}

const notWalletInstalledTitle = 'No wallet installed'
const notWalletInstalledMessage =
  'Please check if Metamask is installed and is connected to the correct network.'

const disconnectAccountTitle = 'Your wallet is connected'
const disconnectAccountMessage =
  "Do you want to disconnect? You won't be able to use the app but you won't lose your tokens and you can always connect again."

const WalletButton = () => {
  const {
    connectWallet,
    disconnectAccount,
    isWalletInstalled,
    isAccountConnected,
    operationInProgress,
  } = useWallet()
  const { momBalance } = useWalletBalance()
  const [showModalInstallWallet, setShowModalInstallWallet] = useState(false)
  const [showModalDisconnectAccount, setShowModalDisconnectAccount] = useState(false)

  const onClickStart = () => {
    if (isAccountConnected) {
      return
    }
    if (!isWalletInstalled) {
      return setShowModalInstallWallet(true)
    }
    connectWallet()
  }

  const onClickConnected = () => {
    setShowModalDisconnectAccount(true)
  }

  const onClickDisconnect = () => {
    disconnectAccount()
    setShowModalDisconnectAccount(false)
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

  const modalDisconnectAccount = () => {
    return (
      <AlertDialog
        visible={showModalDisconnectAccount}
        actions={{
          main: { text: 'Disconnect', color: 'error', onPress: () => onClickDisconnect() },
          dismiss: { text: 'Cancel', onPress: () => setShowModalDisconnectAccount(false) },
        }}
        title={disconnectAccountTitle}
        message={disconnectAccountMessage}
      />
    )
  }

  const showBalance = () => {
    return `${momBalance} ${actionWalletButtonText.balance}`
  }

  const renderTextButton = () => {
    if (operationInProgress) {
      return
    }
    if (isAccountConnected) {
      return showBalance()
    }
    return actionWalletButtonText.start
  }

  return (
    <>
      <Button
        responsive={false}
        text={renderTextButton()}
        color={isAccountConnected ? 'success' : 'primary'}
        onClick={isAccountConnected ? onClickConnected : onClickStart}
        loading={operationInProgress}
      />
      {modalInstallWallet()}
      {modalDisconnectAccount()}
    </>
  )
}

WalletButton.displayName = 'WalletButton'

export { WalletButton, actionWalletButtonText }
