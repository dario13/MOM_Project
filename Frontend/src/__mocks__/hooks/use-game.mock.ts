import { useGame, GameState } from '@/hooks/use-game'

export const useGameMocked = (...options: Partial<GameState>[]): void => {
  const mockUseGame = useGame as jest.Mock<GameState>

  const defaultValues: GameState = {
    startGame: jest.fn(),
    bet: jest.fn(),
    canPlay: jest.fn(),
    resetGame: jest.fn(),
    claimPrize: jest.fn(),
    isGameLost: false,
    isGameWon: false,
    difficulty: 0,
    isGameStarted: false,
    isGameOver: false,
    dealtCards: [],
    rules: [
      { tokensToPlay: 3, tokensPrize: 1, cardsToWin: 4, difficulty: 0 },
      { tokensToPlay: 5, tokensPrize: 3, cardsToWin: 6, difficulty: 1 },
      { tokensToPlay: 7, tokensPrize: 10, cardsToWin: 8, difficulty: 2 },
    ],
    matchContractAddress: '',
    bettingResults: [],
    chosenBets: [],
  }

  mockUseGame.mockReturnValue(Object.assign({}, defaultValues, ...options))
}
