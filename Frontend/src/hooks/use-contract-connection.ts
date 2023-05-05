import {
  GameV1__factory,
  GameV1,
  MOMTokenV1,
  MOMTokenV1__factory,
  Match,
  Match__factory,
  USDtoken,
  USDtoken__factory,
  Exchange,
  Exchange__factory,
} from '@dario13/backend/typechain-types'
import { useCallback, useMemo } from 'react'
import env from '@/config/env'
import { Signer } from 'ethers'

export type ContractConnectionState = {
  gameContract: GameV1
  momTokenContract: MOMTokenV1
  matchContract: (matchContractAddress: string) => Match
  exchangeContract: Exchange
  usdTokenContract: USDtoken
}

export const useContractConnection = (signer: Signer): ContractConnectionState => {
  const {
    EXCHANGE_CONTRACT_ADDRESS,
    MOM_TOKEN_CONTRACT_ADDRESS,
    GAME_CONTRACT_ADDRESS,
    USD_TOKEN_CONTRACT_ADDRESS,
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

  const exchangeContract: Exchange = useMemo(() => {
    return Exchange__factory.connect(EXCHANGE_CONTRACT_ADDRESS, signer)
  }, [signer, EXCHANGE_CONTRACT_ADDRESS])

  const usdTokenContract: USDtoken = useMemo(() => {
    return USDtoken__factory.connect(USD_TOKEN_CONTRACT_ADDRESS, signer!)
  }, [signer, USD_TOKEN_CONTRACT_ADDRESS])

  return {
    gameContract,
    momTokenContract,
    matchContract,
    exchangeContract,
    usdTokenContract,
  }
}
