import React from 'react'
import { Button, FlexBox } from '@/components/atoms'
import { Divider } from '@/components/atoms/divider'
import { ExchangeMode } from '../exchange-card.props'

type BuyAndSellHeaderProps = {
  exchangeMode: ExchangeMode
  handleExchangeMode: (mode: ExchangeMode) => void
}

const BuyAndSellHeader: React.FC<BuyAndSellHeaderProps> = ({
  exchangeMode,
  handleExchangeMode,
}) => {
  const isBuyMode = exchangeMode === 'buy'
  const mainColor = isBuyMode ? 'success' : 'error'

  return (
    <FlexBox maxHeight="8vh">
      <FlexBox justifyContent="center">
        <FlexBox flexDirection="row" justifyContent="space-around">
          <Button
            text="Buy"
            size="md"
            responsive={false}
            color={isBuyMode ? mainColor : 'ghost'}
            onClick={() => handleExchangeMode('buy')}
          />

          <Button
            text="Sell"
            size="md"
            responsive={false}
            color={isBuyMode ? 'ghost' : mainColor}
            onClick={() => handleExchangeMode('sell')}
          />
        </FlexBox>
        <FlexBox justifyContent="flex-start">
          <Divider color={mainColor} />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  )
}

export default React.memo(BuyAndSellHeader)
