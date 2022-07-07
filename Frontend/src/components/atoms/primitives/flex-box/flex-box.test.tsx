import React from 'react'
import { render, screen } from '@testing-library/react'
import { FlexBox } from './flex-box'

describe('FlexBox', () => {
  test('should render a FlexBox component', () => {
    // Given
    render(<FlexBox />)

    // When
    const renderedTextComponent = screen.getByTestId('FlexBox')

    // Then
    expect(renderedTextComponent).toBeInTheDocument()
  })
})
