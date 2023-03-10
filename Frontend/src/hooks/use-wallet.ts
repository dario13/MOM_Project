import { useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import { Wallet, useWalletStore } from '@/store/wallet/wallet.store'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type WalletState = Wallet & {
  connectWallet: () => void
  disconnectWallet: () => void
}

export const useWallet = (): WalletState => {
  const {
    isWalletConnected,
    isWalletInstalled,
    signer,
    setWalletConnected,
    setWalletInstalled,
    setSigner,
    disconnect,
  } = useWalletStore()

  const fetchSigner = useCallback(async () => {
    try {
      if (!isWalletConnected) {
        return
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any')

      const signerWithAddress = await SignerWithAddress.create(provider.getSigner() as any)

      setSigner(signerWithAddress)
    } catch (e) {
      console.error(e)
    }
  }, [isWalletConnected])

  useEffect(() => {
    fetchSigner()
  }, [fetchSigner])

  useEffect(() => {
    const checkIfWalletIsInstalled = () => {
      typeof window.ethereum !== 'undefined' ? setWalletInstalled(true) : setWalletInstalled(false)
    }
    checkIfWalletIsInstalled()
  }, [])

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
  })

  const connect = async () => {
    if (isWalletConnected) return
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

        setWalletConnected(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return {
    connectWallet: () => connect(),
    disconnectWallet: () => disconnect(),
    isWalletInstalled,
    isWalletConnected,
    signer,
  }
}
