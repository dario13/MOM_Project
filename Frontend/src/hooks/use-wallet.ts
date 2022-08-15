import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useWalletStore } from '@/store/wallet/wallet.store'

export const useWallet = () => {
  const { isConnected, disconnected, connected } = useWalletStore()
  const [isWalletInstalled, setIsWalletInstalled] = useState(false)
  const [error, setError] = useState<Error>()
  const [signer, setSigner] = useState()

  useEffect(() => {
    const checkIfWalletIsInstalled = () =>
      typeof window.ethereum !== 'undefined'
        ? setIsWalletInstalled(true)
        : setIsWalletInstalled(false)

    const checkIfWalletHasChanged = () => {
      window.ethereum.on('accountsChanged', () => {
        disconnected()
      })
    }

    checkIfWalletIsInstalled()
    checkIfWalletHasChanged()
  })

  async function connect() {
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

        const provider = new ethers.providers.Web3Provider(window.ethereum as any)

        setSigner(provider.getSigner() as any)
        connected()
      } catch (e: any) {
        setError(e)
      }
    }
    
  }

  return {
    connect,
    disconnect: () => disconnected(),
    isWalletInstalled,
    isWalletConnected: isConnected,
    error,
    signer,
  }
}
