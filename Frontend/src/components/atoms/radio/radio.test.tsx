import React from 'react'
import { render, screen } from '@testing-library/react'
import { Radio } from './radio'
import userEvent from '@testing-library/user-event'

describe('Radio', () => {
  it('should render the Radio component with default values', () => {
    // Given
    render(<Radio value={'1'} />)

    // When
    const radio = screen.getByRole('radio')

    // Then
    expect(radio).toBeInTheDocument()
    expect(radio).not.toBeChecked()
  })

  it('should render the Radio component with custom values', () => {
    // Given
    render(<Radio color="primary" size="md" value="test" />)

    // When
    const radio = screen.getByRole('radio')

    // Then
    expect(radio).toBeInTheDocument()
    expect(radio).toHaveAttribute('value', 'test')
  })

  it('should change the checked state when clicked', async () => {
    // Given
    render(<Radio value={'1'} />)

    // When
    const radio = screen.getByRole('radio')
    await userEvent.click(radio)

    // Then
    expect(radio).toBeChecked()
  })
})
