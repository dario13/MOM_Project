import { zeroAddress } from '@/utils/zero-address'
import { Signer, ethers } from 'ethers'

export class NullSigner extends ethers.Signer {
  async getAddress(): Promise<string> {
    return zeroAddress
  }

  async signMessage(_message: string | ethers.utils.Bytes): Promise<string> {
    throw new Error('NullSigner cannot sign messages')
  }

  async signTransaction(
    _transaction: ethers.utils.Deferrable<ethers.providers.TransactionRequest>,
  ): Promise<string> {
    throw new Error('NullSigner cannot sign transactions')
  }

  connect(_provider: ethers.providers.Provider): Signer {
    return this
  }
}
