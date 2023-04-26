import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { Divider } from './divider'
import { FlexBox } from '../primitives'
import { DividerProps } from './divider.props'

const meta: Meta<DividerProps> = {
  title: 'Atoms/Divider',
  component: Divider,
}

type DividerStory = Story<DividerProps>

export default meta

const DividerTemplate: React.FC<DividerProps> = (args) => (
  <FlexBox width="50vw" height="80vh" flexDirection={args.vertical ? 'row' : 'column'}>
    <FlexBox className="bg-primary"></FlexBox>
    <Divider {...args} />
    <FlexBox className="bg-primary"></FlexBox>
  </FlexBox>
)

export const Primary: DividerStory = {
  render: withTemplate(DividerTemplate),
  args: {
    vertical: false,
    color: 'base100',
    size: 'xs',
  },
}
