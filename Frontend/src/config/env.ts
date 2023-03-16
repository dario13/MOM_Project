import deployedContractAddresses from '@dario13/backend/deployed-contract-addresses.json'

type EnvConstants = {
  PRICE_FEED_CONTRACT_ADDRESS: string
  EXCHANGE_CONTRACT_ADDRESS: string
  MOM_TOKEN_CONTRACT_ADDRESS: string
  GAME_CONTRACT_ADDRESS: string
  BLOCK_CONFIRMATIONS: number
}

const getEnvConstants = (): EnvConstants => {
  return {
    PRICE_FEED_CONTRACT_ADDRESS: deployedContractAddresses.PriceFeedConsumer,
    EXCHANGE_CONTRACT_ADDRESS: deployedContractAddresses.ExchangeV1,
    MOM_TOKEN_CONTRACT_ADDRESS: deployedContractAddresses.MOMTokenV1,
    GAME_CONTRACT_ADDRESS: deployedContractAddresses.GameV1,
    BLOCK_CONFIRMATIONS: deployedContractAddresses.blockConfirmations,
  }
}

export default getEnvConstants()
