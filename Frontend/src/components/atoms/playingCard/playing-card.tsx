import React from 'react'
import { PlayingCardProps } from './playing-card.props'
import { Suit } from '@/store/game/game.types'

export const PlayingCard: React.FC<PlayingCardProps> = ({ card }) => {
  const suitSymbol = () => {
    switch (card.suit) {
      case Suit.hearts:
        return '♥'
      case Suit.diamonds:
        return '♦'
      case Suit.clubs:
        return '♣'
      case Suit.spades:
        return '♠'
      default:
        return ''
    }
  }

  const textColor = () => {
    return card.suit === Suit.hearts || card.suit === Suit.diamonds ? 'red' : 'black'
  }

  return (
    <svg width="100" height="150">
      <rect width="100" height="150" fill="white" />
      <text x="10" y="20" fontSize="20" fill={textColor()}>
        {card.value}
      </text>
      <text x="80" y="143" fontSize="20" fill={textColor()}>
        {card.value}
      </text>
      <text x="38" y="75" fontSize="30" fill={textColor()}>
        {suitSymbol()}
      </text>
    </svg>
  )
}
