import React from 'react'
import { render, screen } from '@testing-library/react'
import { MainNavbar } from './main-navbar'

import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'

import { useWalletMocked } from '@/__mocks__/hooks/use-wallet.mock'

import { useWalletBalanceMocked } from '@/__mocks__/hooks/use-wallet-balance'

jest.mock('@/hooks/use-wallet')
jest.mock('@/hooks/use-wallet-balance')

const renderedComponent = () => {
  return render(<MainNavbar />)
}

beforeEach(() => {
  useMediaMocked({ isDesktop: true })
  useWalletMocked()
  useWalletBalanceMocked()
})

describe('MainNavbar', () => {
  it('when the screen size is desktop, the logo must be rendered and the hamburguer menu must not be rendered', () => {
    // Given
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
})
