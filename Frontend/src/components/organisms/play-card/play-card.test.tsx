import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { PlayCard } from './play-card'
import { BetOptions } from '@/store/game/game.types'
import { useGame } from '@/hooks/use-game'
import { useGameMocked } from '@/__mocks__/hooks/use-game.mock'
import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'

jest.mock('@/hooks/use-game')
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('PlayCard', () => {
  beforeEach(() => {
    useGameMocked()
    useMediaMocked({ isDesktop: true })
  })

  test('renders higher and lower buttons', () => {
    // Given the component is rendered
    render(<PlayCard />)

    // When checking for the buttons
    const higherButton = screen.getByText('↑ Higher')
    const lowerButton = screen.getByText('↓ Lower')

    // Then it displays the higher and lower buttons
    expect(higherButton).toBeInTheDocument()
    expect(lowerButton).toBeInTheDocument()
  })

  test('calls the bet function with the higher option when the higher button is clicked', async () => {
    // Given the component is rendered
    useGameMocked({ isGameStarted: true, dealtCards: [{ suit: 0, value: 2 }] })
    render(<PlayCard />)

    // When the higher button is clicked
    await act(async () => {
      fireEvent.click(screen.getByText('↑ Higher'))
    })

    // Then it calls the bet function with the higher option
    const { bet } = useGame()
    expect(bet).toHaveBeenCalledWith(BetOptions.higher)
  })

  test('calls the bet function with the lower option when the lower button is clicked', async () => {
    // Given the component is rendered
    useGameMocked({ isGameStarted: true, dealtCards: [{ suit: 0, value: 2 }] })
    render(<PlayCard />)

    // When the lower button is clicked
    await act(async () => {
      fireEvent.click(screen.getByText('↓ Lower'))
    })

    // Then it calls the bet function with the lower option
    const { bet } = useGame()
    expect(bet).toHaveBeenCalledWith(BetOptions.lower)
  })

  test('displays the game lost modal when the game is lost', async () => {
    // Given the game is lost
    useGameMocked({ isGameLost: true })
    render(<PlayCard />)

    // When checking for the game lost modal
    const modalTitle = await waitFor(() => screen.getByText('Game Over 🙁 Better Luck Next Time'))

    // Then it displays the game lost modal
    expect(modalTitle).toBeInTheDocument()
  })

  test('displays the game won modal when the game is won', async () => {
    // Given the game is won
    useGameMocked({ isGameWon: true })
    render(<PlayCard />)

    // When checking for the game won modal
    const modalTitle = await waitFor(() => screen.getByText('Victory Royale! 🎉'))

    // Then it displays the game won modal
    expect(modalTitle).toBeInTheDocument()
  })
})
