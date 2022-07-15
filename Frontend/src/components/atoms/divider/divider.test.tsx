import React from 'react'
import { render, screen } from '@testing-library/react'
import { Divider } from './divider'

describe('Divider', () => {
  test('should render a Divider component', () => {
    // Given
    render(<Divider />)

    // When
    const renderedDividerComponent = screen.getByTestId('Divider')

    // Then
    expect(renderedDividerComponent).toBeInTheDocument()
  })
})
