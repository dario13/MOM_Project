import React from 'react'
import { render, screen } from '@testing-library/react'
import { Dropdown } from './dropdown'
import { Button } from '../button'
import { useMediaQueryMock } from '@/__mocks__/hooks/use-media-query.mock'

describe('Dropdown', () => {
  beforeAll(() => {
    useMediaQueryMock()
  })
  it('should not show Dropdown', () => {
    // Given
    render(
      <Dropdown
        toggleElement={<Button>Toggle</Button>}
        content={[
          { label: 'Example item 1', onClick: () => ({}) },
          { label: 'Example item 2', onClick: () => ({}) },
        ]}
      />,
    )

    // When
    const renderedDropdownComponent = screen.queryByRole('li', { name: 'Example item 1' })

    // Then
    expect(renderedDropdownComponent).not.toBeInTheDocument()
  })

  it('should show Dropdown', () => {
    // Given
    render(
      <Dropdown
        toggleElement={<Button>Toggle</Button>}
        open
        content={[
          { label: 'Example item 1', onClick: () => ({}) },
          { label: 'Example item 2', onClick: () => ({}) },
        ]}
      />,
    )

    // When
    const renderedDropdownComponent = screen.queryByText('Example item 1')

    // Then
    expect(renderedDropdownComponent).toBeInTheDocument()
  })
})
