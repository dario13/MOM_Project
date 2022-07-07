import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  test('should render a Button component', () => {
    // Given
    render(<Button text="test" />)

    // When
    const renderedTextComponent = screen.getByTestId('Button')

    // Then
    expect(renderedTextComponent).toBeInTheDocument()
  })
})
