import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from './card'
import { Button } from '../button'

describe('Card', () => {
  test('should render a Card component', () => {
    // Given
    render(
      <Card>
        <Button text="Test Button" />
      </Card>,
    )

    // When
    const renderedCardComponent = screen.getByText('Test Button')
    // Then
    expect(renderedCardComponent).toBeInTheDocument()
  })
})
