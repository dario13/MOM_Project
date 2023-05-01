import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { PlayCard } from './play-card'

const meta: Meta<typeof PlayCard> = {
  title: 'Organisms/PlayCard',
  component: PlayCard,
}

type PlayCardStory = Story<typeof PlayCard>

const PlayCardTemplate: React.FC = (args) => <PlayCard {...args} />

export const Primary: PlayCardStory = {
  render: withTemplate(PlayCardTemplate),
  args: {},
}

export default meta
