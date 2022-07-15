import React from 'react'
import { render, screen } from '@testing-library/react'
import { Loader } from './loader'

describe('Loader', () => {
  test('should render a Loader component', () => {
    // Given
    render(<Loader />)

    // When
    const renderedLoaderComponent = screen.getByTestId('Loader')

    // Then
    expect(renderedLoaderComponent).toBeInTheDocument()
  })
})
