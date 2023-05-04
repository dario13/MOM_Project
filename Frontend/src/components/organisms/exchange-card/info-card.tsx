import React from 'react'
import { Card, FlexBox, Image, Text } from '@/components/atoms'
import { ExchangeMode } from './exchange-card.props'
import exchangeModeContent from './exchange-mode-content'

const InfoCard = React.memo((props: { exchangeMode: ExchangeMode }) => {
  const { title, description, image } = exchangeModeContent(props.exchangeMode)

  return (
    <FlexBox maxWidth="40%">
      <Card>
        <FlexBox>
          <FlexBox padding="2rem" paddingTop="4rem">
            <Text size="IIIxl" bold align="center" text={title} />
          </FlexBox>
          <FlexBox alignItems="center">
            <Image src={image} width="150" alt="info-image" />
          </FlexBox>
          <FlexBox padding="2rem">
            <Text size="xl" align="center" text={description} />
          </FlexBox>
        </FlexBox>
      </Card>
    </FlexBox>
  )
})

InfoCard.displayName = 'InfoCard'

export { InfoCard }
