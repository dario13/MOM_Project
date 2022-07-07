import React from 'react'
import { render, screen } from '@testing-library/react'
import { Image } from './image'
import logo from '../../../../public/images/logo.png'

describe('Image', () => {
  test('should render an Image component', () => {
    // Given
    render(<Image src={logo} />)

    // When
    const renderedImageComponent = screen.getByTestId('Image')

    // Then
    expect(renderedImageComponent).toBeInTheDocument()
  })
})
