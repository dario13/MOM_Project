import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from './input'

describe('Input', () => {
  test('should render an Input component', () => {
    // Given
    render(<Input />)

    // When
    const renderedInputComponent = screen.getByTestId('Input')

    // Then
    expect(renderedInputComponent).toBeInTheDocument()
  })
})
