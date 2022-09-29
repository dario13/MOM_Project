import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ExchangeCard } from './exchange-card'
import { FlexBox } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'

export default {
  title: 'Organisms/ExchangeCard',
  component: ExchangeCard,
} as ComponentMeta<typeof ExchangeCard>

const Template: ComponentStory<typeof ExchangeCard> = () => {
  const { isMobile } = useMedia()

  return (
    <FlexBox
      alignItems="center"
      height={isMobile ? '90vh' : '60vh'}
      minHeight={isMobile ? '90vh' : '60vh'}
    >
      <ExchangeCard />
    </FlexBox>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
