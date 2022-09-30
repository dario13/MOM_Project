import React from 'react'
import { getByRole, render } from '@testing-library/react'
import { ExchangeCard } from './exchange-card'
import userEvent from '@testing-library/user-event'

import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'
import { minimumMOMToBuyInETH, minimumMOMToSell } from './buy-and-sell-card'

const renderedComponent = () => {
  return render(<ExchangeCard />)
}

describe('ExchangeCard', () => {
  it('if the amount input is empty, the confirm button should be disabled', () => {
    // Given
    useMediaMocked({ isDesktop: true })
    const { getByText } = renderedComponent()

    // When
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })

  it('if the exchange mode is buy and amount input is correct, the confirm button should be enabled', async () => {
    // Given
    useMediaMocked({ isDesktop: true })
    const { container, getByText } = renderedComponent()

    // When
    const renderedAmountInput = getByRole(container, 'textbox', { name: 'amount-to-buy' })
    await userEvent.type(renderedAmountInput, minimumMOMToBuyInETH.toString())
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeEnabled()
  })

  it('if the exchange mode is sell and amount input is correct, the confirm button should be enabled', async () => {
    // Given
    useMediaMocked({ isDesktop: true })
    const { container, getByText } = renderedComponent()

    // When
    const renderedSellModeButton = getByText('Sell', { selector: 'button' })
    await userEvent.click(renderedSellModeButton)
    const renderedAmountInput = getByRole(container, 'textbox', { name: 'amount-to-sell' })
    await userEvent.type(renderedAmountInput, minimumMOMToSell.toString())
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeEnabled()
  })

  it('if the exchange mode is buy and amount input is incorrect, the confirm button should be disabled', async () => {
    // Given
    useMediaMocked({ isDesktop: true })
    const { container, getByText } = renderedComponent()

    // When
    const renderedAmountInput = getByRole(container, 'textbox', { name: 'amount-to-buy' })
    await userEvent.type(renderedAmountInput, '0')
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })

  it('if the exchange mode is sell and amount input is incorrect, the confirm button should be disabled', async () => {
    // Given
    useMediaMocked({ isDesktop: true })
    const { container, getByText } = renderedComponent()

    // When
    const renderedSellModeButton = getByText('Sell', { selector: 'button' })
    await userEvent.click(renderedSellModeButton)
    const renderedAmountInput = getByRole(container, 'textbox', { name: 'amount-to-sell' })
    await userEvent.type(renderedAmountInput, '0')
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })
})
