import React from 'react'
import { FlexBox, Text } from '@/components/atoms'

import { ExchangeMode } from '../exchange-card.props'
import {
  MOMToBuyIsLessThanMinimum,
  MOMToSellIsLessThanMinimum,
  inputLabel,
  maskOptions,
  minimumMOMToBuy,
  minimumMOMToSell,
  minimumToExchangeMessage,
} from './buy-and-sell-constants'
import { Input } from '@/components/atoms'

type AmountInputProps = {
  exchangeMode: ExchangeMode
  isMobile: boolean
  amountToBuy: string
  amountToSell: string
  handleInputChange: (mask: IMask.InputMask<IMask.AnyMaskedOptions>) => void
  handleResetInput: () => void
}

const AmountInput: React.FC<AmountInputProps> = ({
  exchangeMode,
  isMobile,
  amountToBuy,
  amountToSell,
  handleInputChange,
  handleResetInput,
}) => {
  const isBuyMode = exchangeMode === 'buy'

  const amountIsValid = () => {
    if (isBuyMode) {
      if (!amountToBuy) return true
      return !MOMToBuyIsLessThanMinimum(amountToBuy)
    } else {
      if (!amountToSell) return true
      return !MOMToSellIsLessThanMinimum(amountToSell)
    }
  }

  return (
    <FlexBox alignItems="center">
      <Input
        key={exchangeMode + '-amount-input'}
        title={'amount-to-' + exchangeMode}
        label={inputLabel[exchangeMode]}
        inputSize={isMobile ? 'sm' : 'md'}
        suffix={'MOM'}
        type="text"
        mask={{
          options: maskOptions[exchangeMode],
          onAccept() {
            handleResetInput()
          },
          onComplete(value, mask) {
            handleInputChange(mask)
          },
        }}
        value={isBuyMode ? amountToBuy : amountToSell}
        color={amountIsValid() ? 'ghost' : 'error'}
      />
      {!amountIsValid() && (
        <Text
          text={
            isBuyMode
              ? minimumToExchangeMessage.buy + minimumMOMToBuy
              : minimumToExchangeMessage.sell + minimumMOMToSell
          }
        />
      )}
    </FlexBox>
  )
}

export default React.memo(AmountInput)
