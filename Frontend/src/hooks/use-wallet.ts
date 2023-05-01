import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Wallet, useWalletStore } from '@/store/wallet/wallet.store'

export type WalletState = Omit<Wallet, 'momBalance'> & {
  connectWallet: () => void
  disconnectAccount: () => void
  operationInProgress: boolean
}

export const useWallet = (): WalletState => {
  const {
    isAccountConnected,
    isWalletInstalled,
    isAccountLoggedOut,
    signer,
    signerAddress,
    setAccountConnected,
    setWalletInstalled,
    setAccountLoggedOut,
    setSigner,
    setSignerAddress,
    disconnect,
  } = useWalletStore()
  const [operationInProgress, setOperationInProgress] = useState<boolean>(false)

  // Returns true if the wallet is installed, false otherwise
  const checkIfWalletIsInstalled = () => {
    return typeof window.ethereum !== 'undefined'
  }

  // Fetch signer
  const fetchSigner = useCallback(async () => {
    if (isAccountLoggedOut) return

    const provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any')

    try {
      const accounts: string[] = await provider.send('eth_requestAccounts', [])

      if (accounts.length === 0) {
        setAccountConnected(false)
        return
      }

      const signer = provider.getSigner()

      setSigner(signer)
      setSignerAddress(await signer.getAddress())
      setAccountConnected(true)
    } catch (e) {
      console.error(e)
    }
  }, [isAccountConnected, setSigner])

  useEffect(() => {
    fetchSigner()
  }, [fetchSigner])

  // Check if the wallet is installed and update the state
  useEffect(() => {
    if (!checkIfWalletIsInstalled()) {
      setWalletInstalled(false)
      return
    }

    setWalletInstalled(true)
  }, [])

  // Add listeners to handle wallet and chain changes
  useEffect(() => {
    const checkIfWalletHasChanged = () => {
      window.ethereum?.on('accountsChanged', () => {
        disconnect()
      })
      window.ethereum?.on('chainChanged', () => {
        disconnect()
      })
    }

    checkIfWalletHasChanged()

    return () => {
      window.ethereum?.removeAllListeners()
    }
  }, [disconnect])

  const connectWallet = async () => {
    if (isAccountConnected) return
    if (isWalletInstalled) {
      setOperationInProgress(true)
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        setAccountConnected(true)
        setAccountLoggedOut(false)
        setOperationInProgress(false)
      } catch (e) {
        setOperationInProgress(false)
        console.error(e)
      }
    }
  }

  return {
    connectWallet,
    disconnectAccount: disconnect,
    operationInProgress,
    isWalletInstalled,
    isAccountLoggedOut,
    isAccountConnected,
    signer,
    signerAddress,
  }
}
