enum Suit {
  spades = 0,
  hearts = 1,
  diamonds = 2,
  clubs = 3,
}

enum Value {
  two = 2,
  three = 3,
  four = 4,
  five = 5,
  six = 6,
  seven = 7,
  eight = 8,
  nine = 9,
  ten = 10,
  jack = 'J',
  queen = 'Q',
  king = 'K',
  ace = 'A',
}

export type Card = {
  readonly suit: Suit
  readonly value: Value
}

enum BetOptions {
  higher = 0,
  lower = 1,
}

enum BetResult {
  won = 0,
  lost = 1,
}

enum Difficulty {
  Easy = 0,
  Medium = 1,
  Hard = 2,
}

export type Rule = {
  readonly difficulty: Difficulty
  readonly cardsToWin: number
  readonly tokensToPlay: number
  readonly tokensPrize: number
}

export type Game = {
  readonly matchContractAddress: string
  readonly isGameStarted: boolean
  readonly isGameOver: boolean
  readonly isGameLost: boolean
  readonly isGameWon: boolean
  readonly dealtCards: Card[]
  readonly bettingResults: BetResult[]
  readonly chosenBets: BetOptions[]
  readonly rules: Rule[]
  readonly difficulty: Difficulty
}

export type GameState = Game & {
  setMatchContractAddress: (gameContractAddress: string) => void
  setIsGameStarted: (isGameStarted: boolean) => void
  setIsGameOver: (isGameOver: boolean) => void
  setIsGameLost: (isGameLost: boolean) => void
  setIsGameWon: (isGameWon: boolean) => void
  setDealtCard: (card: Card, hand: number) => void
  setBettingResult: (hand: number, result: BetResult) => void
  setChosenBet: (hand: number, chosen: BetOptions) => void
  setRules: (rules: Rule[]) => void
  setDifficulty: (difficulty: Difficulty) => void
  reset: () => void
}

export { Suit, Value, BetOptions, Difficulty, BetResult }
