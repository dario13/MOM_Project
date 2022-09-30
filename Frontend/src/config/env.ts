/* eslint-disable @typescript-eslint/no-var-requires */
import { getEnvName } from '@/utils/get-env-name'

type EnvConstants = {
  PRICE_FEED_CONTRACT_ADDRESS: string
  EXCHANGE_CONTRACT_ADDRESS: string
  MOM_TOKEN_CONTRACT_ADDRESS: string
  BLOCK_CONFIRMATIONS: number
}

const getEnvFile = (): EnvConstants => {
  const env = getEnvName()

  if (env === 'mainnet') {
    return require('./env.mainnet').default
  }

  if (env === 'testnet') {
    return require('./env.testnet').default
  }

  return require('./env.local').default
}

export default getEnvFile()
