import { useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import { Wallet, useWalletStore } from '@/store/wallet/wallet.store'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type WalletState = Wallet & {
  connectWallet: () => void
  disconnectAccount: () => void
}

export const useWallet = (): WalletState => {
  const {
    isAccountConnected,
    isWalletInstalled,
    isAccountLoggedOut,
    signer,
    setAccountConnected,
    setWalletInstalled,
    setAccountLoggedOut,
    setSigner,
    disconnect,
  } = useWalletStore()

  // Check if the wallet is installed
  const checkIfWalletIsInstalled = () => {
    return typeof window.ethereum !== 'undefined'
  }

  // Fetch signer
  const fetchSigner = useCallback(async () => {
    const fetch = async () => {
      try {
        if (isAccountLoggedOut) return

        const provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any')

        const signerWithAddress = await SignerWithAddress.create(provider.getSigner() as any)

        setAccountConnected(true)
        setSigner(signerWithAddress)
      } catch (e) {
        console.error(e)
      }
    }

    fetch()
  }, [setAccountConnected, setSigner, isAccountLoggedOut])

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

  // Connect to the wallet
  const connect = async () => {
    if (isAccountConnected) return
    if (isWalletInstalled) {
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
      } catch (e) {
        console.error(e)
      }
    }
  }

  return {
    connectWallet: () => connect(),
    disconnectAccount: () => disconnect(),
    isWalletInstalled,
    isAccountLoggedOut,
    isAccountConnected,
    signer,
  }
}
