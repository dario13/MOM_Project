import { Difficulty, Game, BetOptions, BetResult, Rule } from '@/store/game/game.types'
import { useWallet } from './use-wallet'
import { useGameStore } from '@/store/game/game.store'
import { useCallback, useEffect, useRef } from 'react'
import env from '@/config/env'
import { useContractConnection } from './use-contract-connection'
import { useHandleBlockchainOperations } from './use-handle-blockchain-operations'
import { useWalletBalance } from './use-wallet-balance'
import { numberToCard } from '@/utils/number-to-card'
import { useTransactionStore } from '@/store/transaction/transaction.store'

enum GameErrors {
  NotEnoughTokens = 'Not enough tokens to play',
}

export type GameState = Game & {
  startGame: (difficulty: Difficulty) => Promise<void>
  bet: (betOption: BetOptions) => Promise<void>
  canPlay: (tokensToPlay: number) => boolean
  claimPrize: () => Promise<void>
  resetGame: () => void
  gameError?: GameErrors
}

export const useGame = (): GameState => {
  const { isAccountConnected, signer } = useWallet()
  const { setOperationInProgress } = useTransactionStore()
  const { gameContract, momTokenContract, matchContract } = useContractConnection(signer)
  const {
    isGameStarted,
    dealtCards,
    isGameOver,
    matchContractAddress,
    rules,
    bettingResults,
    chosenBets,
    difficulty,
    isGameLost,
    isGameWon,
    setRules,
    setIsGameLost,
    setIsGameWon,
    setDifficulty,
    setDealtCard,
    setBettingResult,
    setChosenBet,
    setIsGameOver,
    setIsGameStarted,
    setMatchContractAddress,
    reset,
  } = useGameStore()

  const { momBalance } = useWalletBalance()
  const { GAME_CONTRACT_ADDRESS } = env
  const { handleCall, handleTransaction } = useHandleBlockchainOperations()

  console.log('Contract Address', matchContractAddress)

  const fetchRules = useCallback(async () => {
    if (!isAccountConnected) return
    const difficulties = Object.values(Difficulty).filter((key) => typeof key === 'number')
    const promises = difficulties.map((difficulty) => handleCall(gameContract.getRules(difficulty)))
    try {
      const getAllRules = await Promise.all(promises)
      const rules = getAllRules
        .map((rule, index) => {
          if (!rule) return null
          const { tokensToPlay, tokensPrize, cardsToWin } = rule
          return { tokensToPlay, tokensPrize, cardsToWin, difficulty: index }
        })
        .filter((rule): rule is Rule => rule !== null)
      setRules(rules)
    } catch (error) {
      console.error('Error fetching rules:', error)
    }
  }, [isAccountConnected, momBalance])

  useEffect(() => {
    fetchRules()
  }, [fetchRules])

  useEffect(() => {
    if (matchContractAddress && isAccountConnected) {
      registerDealtCards()
      registerBetResult()
    }
    return () => {
      if (matchContractAddress) {
        unRegisterDealtCards()
        unRegisterBetResult()
      }
    }
  }, [matchContractAddress, isAccountConnected])

  const isTheLastHand = (hand: number) => {
    return hand === rules[difficulty].cardsToWin
  }

  const registerDealtCards = () => {
    matchContract(matchContractAddress).on('DealtCard', (cardNumber: number, hand: number) => {
      setDealtCard(numberToCard(cardNumber), hand)
      if (isTheLastHand(hand)) setIsGameOver(true)
    })
  }

  const registerBetResult = () => {
    matchContract(matchContractAddress).on('BetResult', (won: boolean, hand: number) => {
      const result = won ? BetResult.won : BetResult.lost
      setBettingResult(result, hand)

      if (result === BetResult.lost) {
        setIsGameOver(true)
        setIsGameLost(true)
      }

      if (result === BetResult.won && isTheLastHand(hand)) {
        setIsGameWon(true)
      }
    })
  }

  const forceToGetDealtCards = async () => {
    if (!matchContractAddress || !isAccountConnected) return

    try {
      // Get current block
      const currentBlockNumber = await signer.provider!.getBlockNumber()

      // Subtract a specified number of blocks
      const blocksToSubtract = 1000
      const fromBlock = currentBlockNumber - blocksToSubtract
      const toBlock = currentBlockNumber

      // Query past DealtCard events in the specified block range
      const pastEvents = await matchContract(matchContractAddress).queryFilter(
        matchContract(matchContractAddress).filters.DealtCard(),
        fromBlock,
        toBlock,
      )

      // Process events and update status
      pastEvents.forEach((event) => {
        const cardNumber = event.args[0]
        const hand = event.args[1]
        setDealtCard(numberToCard(cardNumber), hand)
        if (isTheLastHand(hand)) setIsGameOver(true)
      })
    } catch (error) {
      console.error('Error fetching past DealtCard events:', error)
    }
  }

  const gameStartTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isGameStarted && dealtCards.length === 0) {
      gameStartTimeout.current = setTimeout(() => {
        forceToGetDealtCards()
      }, 15000) // 15 seconds
    }

    // Clean the timer
    return () => {
      if (gameStartTimeout.current) {
        clearTimeout(gameStartTimeout.current)
      }
    }
  }, [isGameStarted])

  const unRegisterBetResult = () => {
    matchContract(matchContractAddress).removeAllListeners('BetResult')
  }

  const unRegisterDealtCards = () => {
    matchContract(matchContractAddress).removeAllListeners('DealtCard')
  }

  const canPlay = (tokensToPlay: number) => {
    if (Number(momBalance) < tokensToPlay) {
      return false
    }

    return true
  }

  const startGame = async (difficulty: Difficulty) => {
    if (rules.length === 0 || isGameStarted) return

    setDifficulty(difficulty)

    const tokensToPlay = rules[difficulty].tokensToPlay

    if (!canPlay(tokensToPlay)) return

    setOperationInProgress(true)

    // Approve tokens to be spent
    await handleTransaction(momTokenContract.approve(GAME_CONTRACT_ADDRESS, tokensToPlay))

    // Create match
    await handleTransaction(gameContract.createMatch(difficulty))

    // Get match address
    const matchContractAddress = await handleCall(gameContract.getLastMatch())

    if (!matchContractAddress) {
      setOperationInProgress(false)
      return
    }

    // Start match
    await handleTransaction(matchContract(matchContractAddress).startMatch())

    // Register match
    setIsGameStarted(true)
    setMatchContractAddress(matchContractAddress)
    setOperationInProgress(false)
  }

  const resetGame = () => {
    if (isGameStarted && isGameOver) {
      reset()
    }
  }

  const bet = async (betOption: BetOptions) => {
    if (!matchContractAddress || isGameOver) return

    setOperationInProgress(true)
    await handleTransaction(matchContract(matchContractAddress).bet(betOption))
    setChosenBet(dealtCards.length - 1, betOption)
    setOperationInProgress(false)
  }

  const claimPrize = async () => {
    if (!isGameWon) return
    setOperationInProgress(true)
    await handleTransaction(gameContract.claimPrize())
    setOperationInProgress(false)
  }

  return {
    startGame,
    bet,
    canPlay,
    resetGame,
    claimPrize,
    isGameLost,
    isGameWon,
    difficulty,
    isGameStarted,
    isGameOver,
    dealtCards,
    rules,
    matchContractAddress,
    bettingResults,
    chosenBets,
  }
}
