import React from 'react'
import { render, screen } from '@testing-library/react'
import { PlayingCard } from './playing-card'
import { Suit, Value } from '@/store/game/game.types'

describe('PlayingCard', () => {
  // Scenario: Displaying a card with a red suit
  test('given a card with a red suit, when the component is rendered, then the value and suit should be in red', () => {
    // Given
    const card = {
      value: Value.ace,
      suit: Suit.hearts,
    }

    // When
    render(<PlayingCard card={card} />)

    // Then
    const valueElements = screen.getAllByText(card.value, { selector: 'text[fill="red"]' })

    valueElements.forEach((element) => expect(element).toBeInTheDocument())
  })

  // Scenario: Displaying a card with a black suit
  test('given a card with a black suit, when the component is rendered, then the value and suit should be in black', () => {
    // Given
    const card = {
      value: Value.ace,
      suit: Suit.spades,
    }

    // When
    render(<PlayingCard card={card} />)

    // Then
    const valueElements = screen.getAllByText(card.value, { selector: 'text[fill="black"]' })

    valueElements.forEach((element) => expect(element).toBeInTheDocument())
  })
})
