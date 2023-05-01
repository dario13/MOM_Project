import React from 'react'
import { Card, FlexBox, Image, Text } from '@/components/atoms'
import { ExchangeMode } from './exchange-card.props'
import cards from '../../../../public/images/cards.png'
import handReceiving from '../../../../public/images/hand-icon.png'
import { useTheme } from '@/hooks/use-theme'

const buyTitle = 'Start playing now for less than 0,001ETH'
const buyDescription = 'MOM Tokens allow you to bet against other players'

const sellTitle = 'Do you need a break?'
const sellDescription = 'No problem, just sell your MOM tokens and get back ETH'

const exchangeModeContent = (exchangeMode: ExchangeMode) => {
  return exchangeMode === 'buy'
    ? { title: buyTitle, description: buyDescription, image: cards }
    : { title: sellTitle, description: sellDescription, image: handReceiving }
}

const InfoCard = (props: { exchangeMode: ExchangeMode }) => {
  const { title, description, image } = exchangeModeContent(props.exchangeMode)
  const { theme } = useTheme()

  return (
    <FlexBox maxWidth="40%">
      <Card color={theme === 'dark' ? 'neutral' : 'base300'}>
        <FlexBox
          padding="3.5rem"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="3.5rem"
        >
          <Text size="IIIxl" bold align="center" text={title} />
          <Image src={image} height={120} alt="info-image" />
          <Text size="xl" align="center" text={description} />
        </FlexBox>
      </Card>
    </FlexBox>
  )
}

InfoCard.displayName = 'InfoCard'

export { InfoCard, exchangeModeContent }
