import { Card, Suit, Value } from '@/store/game/game.types'

export const numberToCard = (cardNumber: number): Card => {
  if (cardNumber < 0 || cardNumber > 51) {
    throw new Error('Invalid card number. Must be between 0 and 51.')
  }

  const suits: Suit[] = [0, 1, 2, 3]
  const values: Value[] = [
    Value.two,
    Value.three,
    Value.four,
    Value.five,
    Value.six,
    Value.seven,
    Value.eight,
    Value.nine,
    Value.ten,
    Value.jack,
    Value.queen,
    Value.king,
    Value.ace,
  ]

  const suitIndex = Math.floor(cardNumber / 13)
  const valueIndex = cardNumber % 13

  return {
    suit: suits[suitIndex],
    value: values[valueIndex],
  }
}
