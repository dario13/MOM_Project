import React from 'react'
import { render, screen } from '@testing-library/react'
import { Navbar } from './navbar'
import { Button } from '../button'

describe('Navbar', () => {
  it('should show a navbar', () => {
    // Given
    render(<Navbar left={<Button text={'a section in the navbar'} />}></Navbar>)

    // When
    const renderedNavBarComponent = screen.queryByRole('button', {
      name: 'a section in the navbar',
    })

    // Then
    expect(renderedNavBarComponent).toBeInTheDocument()
  })
})
