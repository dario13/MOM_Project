import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { DropdownHamburger } from './dropdown-hamburger'
import { act } from 'react-dom/test-utils'
import { mediaQueryMock } from '@/mocks/media-query'

describe('DropdownHamburger', () => {
  beforeAll(() => {
    mediaQueryMock()
  })
  it('when the hamburger icon is clicked, the menu must be rendered', async () => {
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

    await act(async () => {
      /* fire events that update state */
      if (renderedDropdownHamburgerComponent) {
        fireEvent.click(renderedDropdownHamburgerComponent)
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
  it('when the X icon is clicked, the menu must be changed to closed', async () => {
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

    await act(async () => {
      /* fire events that update state */
      if (renderedDropdownHamburgerComponent) {
        fireEvent.click(renderedDropdownHamburgerComponent)
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
