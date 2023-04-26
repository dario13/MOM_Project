import React from 'react'
import { PlayingCardProps } from './playing-card.props'
import { Suit } from '@/store/game/game.types'

const PlayingCardComponent: React.FC<PlayingCardProps> = ({ card, isFaceUp, ariaLabel }) => {
  const suitSymbol = () => {
    if (!card) return
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
    if (!card) return
    return card.suit === Suit.hearts || card.suit === Suit.diamonds ? 'red' : 'black'
  }

  const renderFront = () => {
    if (!card) return
    return (
      <svg width="100" height="150" aria-label={ariaLabel}>
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

  const renderBack = () => {
    return (
      <svg width="100" height="150" aria-label={ariaLabel}>
        <rect width="100" height="150" fill="#4b0082" />
        <rect x="5" y="5" width="90" height="140" fill="#6a00b7" />

        <circle cx="50" cy="75" r="32" fill="none" stroke="#bf80ff" strokeWidth="4" />
        <circle cx="50" cy="75" r="28" fill="none" stroke="#4b0082" strokeWidth="2" />

        <path
          d="M50,75 Q25,75 25,50 Q25,25 50,25 M50,75 Q75,75 75,50 Q75,25 50,25"
          fill="none"
          stroke="#bf80ff"
          strokeWidth="4"
        />

        <path
          d="M50,125 Q25,125 25,100 Q25,75 50,75 M50,125 Q75,125 75,100 Q75,75 50,75"
          fill="none"
          stroke="#bf80ff"
          strokeWidth="4"
        />

        <circle cx="50" cy="75" r="10" fill="#4b0082" />

        <g fill="none" stroke="#bf80ff" strokeWidth="2">
          <path d="M20,10 L80,10" />
          <path d="M20,140 L80,140" />
          <path d="M10,20 L10,130" />
          <path d="M90,20 L90,130" />
        </g>
      </svg>
    )
  }

  return <>{isFaceUp ? renderFront() : renderBack()}</>
}

PlayingCardComponent.displayName = 'PlayingCard'

export const PlayingCard = React.memo(PlayingCardComponent)
