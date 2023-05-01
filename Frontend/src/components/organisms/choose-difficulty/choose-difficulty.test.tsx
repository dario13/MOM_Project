import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ChooseDifficulty } from './choose-difficulty'
import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'
import { useGameMocked } from '@/__mocks__/hooks/use-game.mock'
import { useWalletBalanceMocked } from '@/__mocks__/hooks/use-wallet-balance'

// Mock the required hooks
jest.mock('@/hooks/use-game')
jest.mock('@/hooks/use-wallet-balance')

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('ChooseDifficulty', () => {
  let startGame: jest.Mock

  beforeEach(() => {
    // Given
    useMediaMocked({ isDesktop: true })
    startGame = jest.fn()
    useGameMocked({ startGame })
    useWalletBalanceMocked()
  })

  it('renders the ChooseDifficulty component', () => {
    // When
    render(<ChooseDifficulty />)

    // Then
    expect(screen.getByText('Choose a difficulty')).toBeInTheDocument()
  })

  it('renders difficulty options', () => {
    // When
    render(<ChooseDifficulty />)

    // Then
    expect(screen.getByText('Easy')).toBeInTheDocument()
    expect(screen.getByText('Medium')).toBeInTheDocument()
    expect(screen.getByText('Hard')).toBeInTheDocument()
  })

  it('enables the Start Game! button when a difficulty is selected', async () => {
    // When
    render(<ChooseDifficulty />)
    const easyOption = screen.getByText('Easy')
    fireEvent.click(easyOption)

    // Then
    const startGameButton = screen.getByText('Start Game!')
    expect(startGameButton).not.toBeDisabled()
  })

  it('calls startGame with the selected difficulty when the Start Game! button is clicked', async () => {
    const { getByText } = render(<ChooseDifficulty />)

    // Select difficulty (EASY)
    const easyOption = screen.getByText('Easy')
    fireEvent.click(easyOption)

    // Click the Start Game! button
    const startGameButton = getByText('Start Game!')
    fireEvent.click(startGameButton)

    // Wait for startGame to be called
    await waitFor(() => expect(startGame).toHaveBeenCalled())

    // Check that startGame was called with the selected difficulty
    expect(startGame).toHaveBeenCalledWith(0) // 0 represents EASY difficulty
  })
})
