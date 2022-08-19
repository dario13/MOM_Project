import React from 'react'
import { render, screen } from '@testing-library/react'
import { actionWalletButtonText, MainNavbar } from './main-navbar'

import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'
import { useWalletMocked } from '@/__mocks__/hooks/use-wallet.mock'

jest.mock('@/hooks/use-wallet')

const renderedComponent = () => {
  return render(<MainNavbar />)
}

describe('MainNavbar', () => {
  it('when the screen size is desktop, the logo must be rendered and the hamburguer menu must not be rendered', () => {
    // Given
    useWalletMocked()
    useMediaMocked({ isDesktop: true })
    const { container } = renderedComponent()

    // When
    const renderedLogo = container.querySelector('img[title="logo"]')
    const renderedDropdownHamburgerComponent = screen.queryByTestId('DropdownHamburger')

    // Then
    expect(renderedLogo).toBeInTheDocument()
    expect(renderedDropdownHamburgerComponent).toBeNull()
  })

  it('when the screen size is mobile, the hamburguer menu and the logo must be rendered', () => {
    // Given
    useMediaMocked({ isMobile: true })
    const { container } = renderedComponent()

    // When
    const renderedDropdownHamburgerComponent = screen.getByTestId('DropdownHamburger')
    const renderedLogo = container.querySelector('img[title="logo"]')

    // Then
    expect(renderedDropdownHamburgerComponent).toBeInTheDocument()
    expect(renderedLogo).toBeInTheDocument()
  })

  it("when the wallet isn't connected, the start button must be rendered", () => {
    // Given
    const buttonTitle = actionWalletButtonText.start
    useWalletMocked({ isWalletConnected: false })
    useMediaMocked({ isDesktop: true })
    const { getByRole } = renderedComponent()

    // When
    const renderedStartButton = getByRole('button', { name: buttonTitle })

    // Then
    expect(renderedStartButton).toBeInTheDocument()
  })

  it('when the wallet is connected, the connected button must be rendered', () => {
    // Given
    const buttonTitle = actionWalletButtonText.connected
    useMediaMocked({ isDesktop: true })
    useWalletMocked({ isWalletConnected: true, isWalletInstalled: true })
    const { getByRole } = renderedComponent()

    // When
    const renderedConnectedButton = getByRole('button', { name: buttonTitle })

    // Then
    expect(renderedConnectedButton).toBeInTheDocument()
  })
})
