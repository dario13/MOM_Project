import { zeroAddress } from '@/utils/zero-address'
import { Signer, ethers } from 'ethers'

export class NullSigner extends ethers.Signer {
  async getAddress(): Promise<string> {
    return zeroAddress
  }

  async signMessage(): Promise<string> {
    throw new Error('NullSigner cannot sign messages')
  }

  async signTransaction(): Promise<string> {
    throw new Error('NullSigner cannot sign transactions')
  }

  connect(): Signer {
    return this
  }
}
