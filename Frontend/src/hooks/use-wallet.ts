import { useCallback, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWalletStore } from '@/store/wallet/wallet.store'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

export type useWalletType = {
  connect: () => void
  disconnect: () => void
  isWalletInstalled: boolean
  isWalletConnected: boolean
  signer?: SignerWithAddress
}

export const useWallet = (): useWalletType => {
  const { isConnected, isInstalled, signer, setConnected, setInstalled, setSigner, disconnect } =
    useWalletStore()

  const fetchSigner = useCallback(async () => {
    try {
      if (!isConnected) {
        return
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum as any, 'any')

      const signerWithAddress = await SignerWithAddress.create(provider.getSigner() as any)

      setSigner(signerWithAddress)
    } catch (e) {
      console.error(e)
    }
  }, [isConnected])

  useEffect(() => {
    fetchSigner()
  }, [fetchSigner])

  useEffect(() => {
    const checkIfWalletIsInstalled = () => {
      typeof window.ethereum !== 'undefined' ? setInstalled(true) : setInstalled(false)
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
    if (isConnected) return
    if (isInstalled) {
      try {
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })

        setConnected(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return {
    connect: () => connect(),
    disconnect: () => disconnect(),
    isWalletInstalled: isInstalled,
    isWalletConnected: isConnected,
    signer,
  }
}
