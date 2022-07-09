import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Card } from './card'
import { FlexBox, Image, Text } from '../primitives'

export default {
  title: 'Atoms/Card',
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => (
  <Card {...args}>
    <FlexBox flexDirection="row" paddingRight="1.5rem" gap="1rem">
      <Image src="https://placeimg.com/640/480/any" title="test" width="300" height="300" />
      <FlexBox gap="1rem" paddingTop="1rem">
        <Text size="lg" bold text={'This is an example title inside a Card'} />
        <Text text={'This is an example text description'} />
      </FlexBox>
    </FlexBox>
  </Card>
)

export const Primary = Template.bind({})
Primary.args = {
  color: 'neutral',
}
