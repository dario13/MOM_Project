export type EnvType = 'local' | 'testnet' | 'mainnet'

export const getEnvName = (): EnvType => {
  if (process.env.MOM_ENV === 'mainnet') {
    return 'mainnet'
  }
  if (process.env.MOM_ENV === 'testnet') {
    return 'testnet'
  }
  return 'local'
}
