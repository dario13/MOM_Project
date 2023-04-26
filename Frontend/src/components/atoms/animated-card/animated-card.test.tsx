import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { Card, Suit, Value } from '@/store/game/game.types'
import { AnimatedCard } from './animated-card'

// Mock setTimeout to doesn't wait the animation's real time
jest.useFakeTimers()

describe('AnimatedCard', () => {
  const faceDownCard: Card = {
    suit: Suit.spades,
    value: Value.two,
  }

  it('should start as face down and animate to face up', async () => {
    // Given
    const { rerender } = render(<AnimatedCard card={faceDownCard} />)

    // When
    expect(screen.getByLabelText('playing-card-face-down')).toBeInTheDocument()

    // Then
    await act(async () => {
      jest.runAllTimers()
      rerender(<AnimatedCard card={faceDownCard} />)
    })

    expect(screen.getByLabelText('playing-card-face-up')).toBeInTheDocument()
  })

  it('should remain face up after animation', async () => {
    // Given
    const { rerender } = render(<AnimatedCard card={faceDownCard} />)
    await act(async () => {
      jest.runAllTimers()
      rerender(<AnimatedCard card={faceDownCard} />)
    })

    // When
    expect(screen.getByLabelText('playing-card-face-up')).toBeInTheDocument()

    // Then
    rerender(<AnimatedCard card={faceDownCard} />)
    expect(screen.getByLabelText('playing-card-face-up')).toBeInTheDocument()
  })
})
