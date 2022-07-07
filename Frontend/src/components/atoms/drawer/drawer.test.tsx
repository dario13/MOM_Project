import React from 'react'
import { render, screen } from '@testing-library/react'
import { Drawer } from './drawer'
import { Button } from '../button'

describe('Loader', () => {
  test('should render a Loader component', () => {
    // Given
    render(<Drawer side={<Button text="Open drawer" />}></Drawer>)

    // When
    const renderedDrawerComponent = screen.getByTestId('Button')

    // Then
    expect(renderedDrawerComponent).toBeInTheDocument()
  })
})
