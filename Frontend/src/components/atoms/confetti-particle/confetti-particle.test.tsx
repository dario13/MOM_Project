import React from 'react'
import { render } from '@testing-library/react'
import { ConfettiParticle } from './confetti-particle'

describe('ConfettiParticle', () => {
  test('renders the ConfettiParticle component', () => {
    // Given the component with custom props
    const customProps = {
      x: 100,
      y: 200,
      size: 10,
      color: 'red',
      duration: 1000,
      delay: 0,
    }

    // When the component is rendered
    const { container } = render(<ConfettiParticle {...customProps} />)
    const confettiParticle = container.firstChild

    // Then the ConfettiParticle component should be rendered
    expect(confettiParticle).toBeInTheDocument()
  })
})
