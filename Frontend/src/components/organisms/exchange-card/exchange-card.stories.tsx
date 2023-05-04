import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { ExchangeCard } from './exchange-card'
import { FlexBox } from '@/components/atoms'
import { useMedia } from '@/hooks/use-media'
import { withTemplate } from '@/ioc/stories/with-template'

const meta: Meta<typeof ExchangeCard> = {
  title: 'Organisms/ExchangeCard',
  component: ExchangeCard,
}

type ExchangeStory = Story<typeof ExchangeCard>

const ExchangeCardTemplate = () => {
  const { isMobile } = useMedia()

  return <ExchangeCard />
}

export const Primary: ExchangeStory = {
  render: withTemplate(ExchangeCardTemplate),
  args: {},
}

export default meta
