import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { DropdownHamburger } from './dropdown-hamburger'
import { act } from 'react-dom/test-utils'

describe('DropdownHamburger', () => {
  it('when the hamburger icon is clicked, the menu should be rendered', async () => {
    // Given
    render(
      <DropdownHamburger
        menuItems={[
          { label: 'Example item 1', onClick: () => ({}) },
          { label: 'Example item 2', onClick: () => ({}) },
        ]}
      />,
    )

    // When
    const renderedDropdownHamburgerComponent = screen.queryByTestId('DropdownHamburger')
    const renderedButtonInDropdownHamburgerComponent = screen.queryByTestId('Button')

    await act(async () => {
      /* fire events that update state */
      if (renderedButtonInDropdownHamburgerComponent) {
        fireEvent.click(renderedButtonInDropdownHamburgerComponent)
      }
    })

    // Then
    // Wait for the dropdown to open
    await waitFor(
      () =>
        expect(renderedDropdownHamburgerComponent?.classList.contains('dropdown-open')).toBe(true),
      { timeout: 10 },
    )
  })
  it('when the X icon is clicked, the menu should be closed', async () => {
    // Given
    render(
      <DropdownHamburger
        menuItems={[
          { label: 'Example item 1', onClick: () => ({}) },
          { label: 'Example item 2', onClick: () => ({}) },
        ]}
        open
      />,
    )

    // When
    const renderedDropdownHamburgerComponent = screen.queryByTestId('DropdownHamburger')
    const renderedButtonInDropdownHamburgerComponent = screen.queryByTestId('Button')

    await act(async () => {
      /* fire events that update state */
      if (renderedButtonInDropdownHamburgerComponent) {
        fireEvent.click(renderedButtonInDropdownHamburgerComponent)
      }
    })

    // Then
    // Wait for the dropdown to close
    await waitFor(
      () =>
        expect(renderedDropdownHamburgerComponent?.classList.contains('dropdown-open')).toBe(false),
      { timeout: 10 },
    )
  })
})
