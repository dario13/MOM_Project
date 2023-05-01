import React from 'react'
import { render } from '@testing-library/react'
import { actionWalletButtonText, WalletButton } from './wallet-button'
import { useWalletMocked } from '@/__mocks__/hooks/use-wallet.mock'
import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'

import { useWalletBalanceMocked } from '@/__mocks__/hooks/use-wallet-balance'

jest.mock('@/hooks/use-wallet')

const renderedComponent = () => {
  return render(<WalletButton />)
}

jest.mock('@/hooks/use-wallet')
jest.mock('@/hooks/use-wallet-balance')

describe('WalletButton', () => {
  beforeEach(() => {
    useMediaMocked({ isDesktop: true })
    useWalletBalanceMocked()
  })

  it("when the wallet isn't connected, the start button must be rendered", () => {
    // Given
    const buttonTitle = actionWalletButtonText.start
    useWalletMocked({ isAccountConnected: false })
    const { getByRole } = renderedComponent()

    // When
    const renderedStartButton = getByRole('button')

    // Then
    expect(renderedStartButton).toHaveTextContent(buttonTitle)
  })

  it('when the wallet is connected, the button should show the balance', async () => {
    // Given
    const buttonTitle = actionWalletButtonText.balance
    useWalletMocked({ isAccountConnected: true, isWalletInstalled: true })
    const { getByRole } = renderedComponent()

    // When
    const renderedConnectedButton = getByRole('button')

    // Then
    expect(renderedConnectedButton).toHaveTextContent(buttonTitle)
  })
})
