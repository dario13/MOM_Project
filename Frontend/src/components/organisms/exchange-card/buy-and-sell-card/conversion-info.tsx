import React from 'react'
import { Text, FlexBox } from '@/components/atoms'
import { conversionMessage } from './buy-and-sell-constants'

type ConversionInfoProps = {
  isBuyMode: boolean
  amount: string
}

const ConversionInfo: React.FC<ConversionInfoProps> = ({ isBuyMode, amount }) => {
  const renderAmount = (amount: string) => {
    return (
      <FlexBox flexDirection="row" gap="1vh" justifyContent="center">
        <Text text={isBuyMode ? conversionMessage.buy : conversionMessage.sell} />
        <Text text={conversionMessage.arrow} />
        <Text text={amount} bold />
      </FlexBox>
    )
  }

  if (!isBuyMode && !amount) return null

  return <FlexBox gap="1vh">{renderAmount(`${amount} USDT`)}</FlexBox>
}

export default React.memo(ConversionInfo)
