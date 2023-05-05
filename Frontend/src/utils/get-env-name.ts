export type EnvType = 'local' | 'testnet' | 'mainnet'

export const getEnvName = (): EnvType => {
  if (process.env.NEXT_PUBLIC_MOM_ENV === 'mainnet') {
    return 'mainnet'
  }
  if (process.env.NEXT_PUBLIC_MOM_ENV === 'testnet') {
    return 'testnet'
  }
  return 'local'
}
