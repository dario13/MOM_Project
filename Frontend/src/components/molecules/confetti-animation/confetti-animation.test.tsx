import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { ConfettiAnimation } from './confetti-animation'

describe('ConfettiAnimation', () => {
  test('renders the specified number of ConfettiParticle components', async () => {
    // Given the component with a specified number of particles
    const numParticles = 10

    // When the component is rendered
    const { getAllByTestId } = render(<ConfettiAnimation numParticles={numParticles} />)

    // Then the specified number of ConfettiParticle components should be rendered
    await waitFor(() => {
      const confettiParticles = getAllByTestId('confetti-particle')
      expect(confettiParticles.length).toBe(numParticles)
    })
  })
})
