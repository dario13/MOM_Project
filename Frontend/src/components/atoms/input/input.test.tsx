import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
  test('should render an Input component', () => {
    // Given
    render(<Input />)

    // When
    const renderedTextComponent = screen.getByTestId('Input')

    // Then
    expect(renderedTextComponent).toBeInTheDocument()
  })
})
