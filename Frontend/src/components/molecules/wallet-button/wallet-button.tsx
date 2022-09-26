import React, { useState } from 'react'
import { Button } from '@/components/atoms'
import { useExchange } from '@/hooks/use-exchange'
import { useWallet } from '@/hooks/use-wallet'
import { AlertDialog } from '../alert-dialog'

const actionWalletButtonText = {
  start: 'Start!',
  balance: 'MOM',
}

const notWalletInstalledTitle = 'No wallet installed'
const notWalletInstalledMessage =
  'Please check if Metamask is installed and is connected to the correct network.'

const disconnectWalletTitle = 'Your wallet is connected'
const disconnectWalletMessage =
  "Do you want to disconnect? You won't be able to use the app but you won't lose your tokens and you can always connect again."

const WalletButton = () => {
  const { connect, disconnect, isWalletInstalled, isWalletConnected } = useWallet()
  const { momBalance, transactionInProgress } = useExchange()
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

  const showBalance = () => {
    const balance = momBalance || '0'
    return `${balance} ${actionWalletButtonText.balance}`
  }

  const renderTextButton = () => {
    if (transactionInProgress) {
      return
    }
    if (isWalletConnected) {
      return showBalance()
    }
    return actionWalletButtonText.start
  }

  return (
    <>
      <Button
        responsive={false}
        text={renderTextButton()}
        color={isWalletConnected ? 'success' : 'primary'}
        onClick={isWalletConnected ? onClickConnected : onClickStart}
        loading={transactionInProgress}
      />
      {modalInstallWallet()}
      {modalDisconnectWallet()}
    </>
  )
}

WalletButton.displayName = 'WalletButton'

export { WalletButton, actionWalletButtonText }
