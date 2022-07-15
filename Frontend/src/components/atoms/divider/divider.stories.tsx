import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Divider } from './divider'
import { FlexBox } from '../primitives'

export default {
  title: 'Atoms/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>

const Template: ComponentStory<typeof Divider> = (args) => (
  <FlexBox width="50vw" height="80vh" flexDirection={args.vertical ? 'row' : 'column'}>
    <FlexBox className="bg-primary"></FlexBox>
    <Divider {...args} />
    <FlexBox className="bg-primary"></FlexBox>
  </FlexBox>
)

export const Primary = Template.bind({})
Primary.args = {
  vertical: false,
  color: 'base100',
  size: 'xs',
}
