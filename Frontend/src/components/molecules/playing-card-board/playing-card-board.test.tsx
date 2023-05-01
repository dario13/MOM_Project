import React from 'react'
import { render, screen } from '@testing-library/react'
import { CardBoard } from './playing-card-board'
import { Suit, Value } from '@/store/game/game.types'

jest.useFakeTimers()

describe('CardBoard', () => {
  const playingCards = [
    { isFaceUp: true, card: { suit: Suit.spades, value: Value.two } },
    { isFaceUp: true, card: { suit: Suit.hearts, value: Value.four } },
    { isFaceUp: true, card: { suit: Suit.diamonds, value: Value.queen } },
    { isFaceUp: true, card: { suit: Suit.clubs, value: Value.nine } },
  ]

  it('should render the CardBoard component with a list of playing cards', () => {
    // Given
    render(<CardBoard playingCards={playingCards} />)

    // When
    const playingCardsFaceUpElements = screen.getAllByLabelText('playing-card-face-up')
    const playingCardsFaceDownElements = screen.getAllByLabelText('playing-card-face-down')

    // Then
    expect(playingCardsFaceUpElements.length + playingCardsFaceDownElements.length).toBe(
      playingCards.length,
    )
  })

  it('should render an AnimatedCard for the first face-up card', () => {
    // Given
    render(<CardBoard playingCards={playingCards} />)

    // When
    const animatedCardElement = screen.getByTestId('animated-card')

    // Then
    expect(animatedCardElement).toBeInTheDocument()
  })
})
