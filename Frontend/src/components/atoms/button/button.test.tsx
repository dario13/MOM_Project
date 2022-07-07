import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Loader', () => {
  test('should render a Loader component', () => {
    // Given
    render(<Button text="test" />)

    // When
    const renderedTextComponent = screen.getByTestId('Button')

    // Then
    expect(renderedTextComponent).toBeInTheDocument()
  })
})
