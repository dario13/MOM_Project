import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { ChangeTheme } from './change-theme'
import { act } from 'react-dom/test-utils'

const renderedComponent = () => {
  return render(<ChangeTheme />)
}

describe('ChangeTheme', () => {
  it('when the component is rendered, the default theme is light', () => {
    // Given
    const { container } = renderedComponent()

    // When
    const renderedTheme = container.querySelector('button[data-theme="light"]')

    // Then
    expect(renderedTheme).toBeInTheDocument()
  })

  it('when the component is clicked, the theme change to dark', async () => {
    // Given
    const { container } = renderedComponent()

    // When
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const renderedTheme = container.querySelector('button[data-theme="light"]')!

    await act(async () => {
      fireEvent.click(renderedTheme)
    })

    // Then
    await waitFor(() => {
      const renderedThemeDark = container.querySelector('button[data-theme="dark"]')
      expect(renderedThemeDark).toBeInTheDocument()
    })
  })
})
