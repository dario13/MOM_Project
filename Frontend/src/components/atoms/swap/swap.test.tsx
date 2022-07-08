import React from 'react'
import { render, screen } from '@testing-library/react'
import { Swap } from './swap'
import { MoonIcon, SunIcon } from '../primitives/icons'

describe('Swap', () => {
  it('should render a Swap Component', () => {
    // Given
    render(<Swap rotate={true} onElement={<MoonIcon />} offElement={<SunIcon />} />)
    // When
    const renderedSwap = screen.getByTestId('Swap')
    // Then
    expect(renderedSwap).toBeInTheDocument()
  })
})
