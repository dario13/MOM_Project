import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { FlexBox } from './flex-box'
import { FlexBoxProps } from './flex-box.props'

const meta: Meta<FlexBoxProps> = {
  title: 'Atoms/Primitives/FlexBox',
  component: FlexBox,
}

type FlexBoxStory = Story<FlexBoxProps>

export default meta

const FlexBoxTemplate: React.FC<FlexBoxProps> = (args) => (
  <FlexBox {...args}>
    <div className="bg-primary p-6 m-2 w-20">1</div>
    <div className="bg-primary p-6 m-2 w-20">2</div>
    <div className="bg-primary p-6 m-2 w-20">3</div>
  </FlexBox>
)

export const Primary: FlexBoxStory = {
  render: withTemplate(FlexBoxTemplate),
  args: {
    flexDirection: 'row',
    className: 'bg-success',
  },
}
