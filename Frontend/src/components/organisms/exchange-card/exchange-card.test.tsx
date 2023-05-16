import React from 'react'
import { getByRole, render, screen } from '@testing-library/react'
import { ExchangeCard } from './exchange-card'
import userEvent from '@testing-library/user-event'

import { useMediaMocked } from '@/__mocks__/hooks/use-media.mock'
import { minimumMOMToBuy, minimumMOMToSell } from './buy-and-sell-card/buy-and-sell-constants'
import { useExchangeMocked } from '@/__mocks__/hooks/use-exchange.mock'

const renderedComponent = () => {
  return render(<ExchangeCard />)
}

jest.mock('@/hooks/use-exchange')

describe('ExchangeCard', () => {
  beforeEach(() => {
    useExchangeMocked()
    useMediaMocked({ isDesktop: true })
  })

  it('if the amount input is empty, the confirm button should be disabled', () => {
    // Given

    const { getByText } = renderedComponent()

    // When
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })

  it('if the exchange mode is buy and amount input is correct, the confirm button should be enabled', async () => {
    // Given

    const { debug, getByText, getByTestId } = renderedComponent()

    // When
    const renderedAmountInput = getByTestId('Input')
    await userEvent.type(renderedAmountInput, minimumMOMToBuy.toString())
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeEnabled()
  })

  it('if the exchange mode is sell and amount input is correct, the confirm button should be enabled', async () => {
    // Given

    const { getByTestId, getByText } = renderedComponent()

    // When
    const renderedSellModeButton = getByText('Sell', { selector: 'button' })
    await userEvent.click(renderedSellModeButton)
    const renderedAmountInput = getByTestId('Input')
    await userEvent.type(renderedAmountInput, minimumMOMToSell.toString())
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeEnabled()
  })

  it('if the exchange mode is buy and amount input is incorrect, the confirm button should be disabled', async () => {
    // Given

    const { getByTestId, getByText } = renderedComponent()

    // When
    const renderedAmountInput = getByTestId('Input')
    await userEvent.type(renderedAmountInput, '0')
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })

  it('if the exchange mode is sell and amount input is incorrect, the confirm button should be disabled', async () => {
    // Given

    const { getByTestId, getByText } = renderedComponent()

    // When
    const renderedSellModeButton = getByText('Sell', { selector: 'button' })
    await userEvent.click(renderedSellModeButton)
    const renderedAmountInput = getByTestId('Input')
    await userEvent.type(renderedAmountInput, '0')
    const renderedConfirmButton = getByText('Confirm', { selector: 'button' })

    // Then
    expect(renderedConfirmButton).toBeDisabled()
  })
})
