import { create } from 'zustand'
import { Card, Game, GameState, Rule, Difficulty, BetOptions, BetResult } from './game.types'
import { persist } from 'zustand/middleware'

const initialState: Game = {
  matchContractAddress: '',
  isGameStarted: false,
  isGameOver: false,
  isGameLost: false,
  isGameWon: false,
  dealtCards: [],
  bettingResults: [],
  chosenBets: [],
  rules: [],
  difficulty: 0,
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      ...initialState,
      setMatchContractAddress: (matchContractAddress: string) =>
        set((state) => ({ ...state, matchContractAddress })),
      setIsGameStarted: (isGameStarted: boolean) => set((state) => ({ ...state, isGameStarted })),
      setIsGameOver: (isGameOver: boolean) => set((state) => ({ ...state, isGameOver })),
      setIsGameLost: (isGameLost: boolean) => set((state) => ({ ...state, isGameLost })),
      setIsGameWon: (isGameWon: boolean) => set((state) => ({ ...state, isGameWon })),
      setBettingResult: (hand: number, result: BetResult) =>
        set((state) => {
          const newBettingResults = [...state.bettingResults]
          newBettingResults[hand] = result
          return { ...state, bettingResults: newBettingResults }
        }),
      setChosenBet: (hand: number, bet: BetOptions) =>
        set((state) => {
          const newChosenBets = [...state.chosenBets]
          newChosenBets[hand] = bet
          return { ...state, chosenBets: newChosenBets }
        }),
      setDealtCard: (card: Card, hand: number) =>
        set((state) => {
          const newDealtCards = [...state.dealtCards]
          newDealtCards[hand] = card
          return { ...state, dealtCards: newDealtCards }
        }),
      setRules: (rules: Rule[]) => set((state) => ({ ...state, rules })),
      setDifficulty: (difficulty: Difficulty) => set((state) => ({ ...state, difficulty })),
      reset: () =>
        set((state) => {
          const { rules } = state
          return { ...initialState, rules }
        }),
    }),
    {
      name: 'game-store',
    },
  ),
)
