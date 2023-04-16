import { zeroAddress } from '@/utils/zero-address'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'
import { useContractConnection } from './use-contract-connection'
import { useCallback, useEffect } from 'react'
import { useWalletStore } from '@/store/wallet/wallet.store'
import { useWallet } from './use-wallet'

export type WalletBalance = {
  momBalance: string
}

export const useWalletBalance = (): WalletBalance => {
  const { setMomBalance, momBalance } = useWalletStore()

  const { signerAddress, signer, isAccountLoggedOut } = useWallet()

  const { handleCall, operationInProgress } = useHandleBlockchainOperations()
  const { momTokenContract } = useContractConnection()

  const getMomBalance = useCallback(async () => {
    if (signerAddress === zeroAddress) return
    const balance = await handleCall(momTokenContract.balanceOf(signerAddress), false)
    setMomBalance(balance ? balance.toString() : '0')
  }, [operationInProgress, signerAddress, signer, isAccountLoggedOut])

  useEffect(() => {
    getMomBalance()
  }, [getMomBalance])

  return { momBalance }
}
