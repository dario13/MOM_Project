import { EnvType, getEnvName } from '@/utils/get-env-name'
import deployedContractAddressesLocal from '@dario13/backend/deployed-contract-addresses-local.json'
import deployedContractAddressesTestnet from '@dario13/backend/deployed-contract-addresses-testnet.json'

type EnvConstants = {
  EXCHANGE_CONTRACT_ADDRESS: string
  USD_TOKEN_CONTRACT_ADDRESS: string
  MOM_TOKEN_CONTRACT_ADDRESS: string
  GAME_CONTRACT_ADDRESS: string
  BLOCK_CONFIRMATIONS: number
}

const getDeployedContractAddresses = (env: EnvType) => {
  if (env === 'testnet') {
    return deployedContractAddressesTestnet
  }
  return deployedContractAddressesLocal
}

const getEnvConstants = (): EnvConstants => {
  const env: EnvType = getEnvName()
  const deployedContractAddresses = getDeployedContractAddresses(env)

  return {
    EXCHANGE_CONTRACT_ADDRESS: deployedContractAddresses.Exchange,
    MOM_TOKEN_CONTRACT_ADDRESS: deployedContractAddresses.MOMTokenV1,
    USD_TOKEN_CONTRACT_ADDRESS: deployedContractAddresses.USDtoken,
    GAME_CONTRACT_ADDRESS: deployedContractAddresses.GameV1,
    BLOCK_CONFIRMATIONS: deployedContractAddresses.blockConfirmations,
  }
}

export default getEnvConstants()
