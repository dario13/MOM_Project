import {
  GameV1__factory,
  GameV1,
  MOMTokenV1,
  MOMTokenV1__factory,
  Match,
  Match__factory,
  ExchangeV1,
  ExchangeV1__factory,
  PriceFeedConsumer,
  PriceFeedConsumer__factory,
} from '@dario13/backend/typechain-types'
import { useCallback, useMemo } from 'react'
import { useWallet } from './use-wallet'
import env from '@/config/env'

export type ContractConnectionState = {
  gameContract: GameV1
  momTokenContract: MOMTokenV1
  matchContract: (matchContractAddress: string) => Match
  exchangeContract: ExchangeV1
  priceFeedConsumerContract: PriceFeedConsumer
}

export const useContractConnection = (): ContractConnectionState => {
  const { signer } = useWallet()

  const {
    EXCHANGE_CONTRACT_ADDRESS,
    MOM_TOKEN_CONTRACT_ADDRESS,
    GAME_CONTRACT_ADDRESS,
    PRICE_FEED_CONTRACT_ADDRESS,
  } = env

  const gameContract: GameV1 = useMemo(() => {
    return GameV1__factory.connect(GAME_CONTRACT_ADDRESS, signer)
  }, [signer, GAME_CONTRACT_ADDRESS])

  const momTokenContract: MOMTokenV1 = useMemo(() => {
    return MOMTokenV1__factory.connect(MOM_TOKEN_CONTRACT_ADDRESS, signer)
  }, [signer, MOM_TOKEN_CONTRACT_ADDRESS])

  const matchContract = useCallback(
    (matchContractAddress: string) => {
      return Match__factory.connect(matchContractAddress, signer)
    },
    [signer],
  )

  const exchangeContract: ExchangeV1 = useMemo(() => {
    return ExchangeV1__factory.connect(EXCHANGE_CONTRACT_ADDRESS, signer)
  }, [signer, EXCHANGE_CONTRACT_ADDRESS])

  const priceFeedConsumerContract: PriceFeedConsumer = useMemo(() => {
    return PriceFeedConsumer__factory.connect(PRICE_FEED_CONTRACT_ADDRESS, signer)
  }, [signer, PRICE_FEED_CONTRACT_ADDRESS])

  return {
    gameContract,
    momTokenContract,
    matchContract,
    exchangeContract,
    priceFeedConsumerContract,
  }
}
