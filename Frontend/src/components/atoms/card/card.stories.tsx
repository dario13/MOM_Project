import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Card } from './card'
import { FlexBox, Image, Text } from '../primitives'
import { CardProps } from './card.props'

const meta: Meta<CardProps> = {
  title: 'Atoms/Card',
  component: Card,
}

type CardStory = Story<CardProps>

export default meta

const CardTemplate: React.FC<CardProps> = ({ ...args }) => (
  <Card {...args}>
    <FlexBox flexDirection="row" paddingRight="1.5rem" gap="1rem">
      <Image
        src="https://placeimg.com/640/480/any"
        title="test"
        width="640"
        height="480"
        alt="image"
      />
      <FlexBox gap="1rem" paddingTop="1rem">
        <Text size="lg" bold text={'This is an example title inside a Card'} />
        <Text text={'This is an example text description'} />
      </FlexBox>
    </FlexBox>
  </Card>
)

export const Template: CardStory = {
  render: withTemplate<CardProps>(CardTemplate),
  args: {
    color: 'neutral',
  },
}
