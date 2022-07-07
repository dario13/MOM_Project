import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { FlexBox } from './flex-box'

export default {
  title: 'Atoms/Primitives/FlexBox',
  component: FlexBox,
} as ComponentMeta<typeof FlexBox>

const Template: ComponentStory<typeof FlexBox> = (args) => (
  <FlexBox {...args}>
    <div className="bg-primary p-6 m-2 w-20">1</div>
    <div className="bg-primary p-6 m-2 w-20">2</div>
    <div className="bg-primary p-6 m-2 w-20">3</div>
  </FlexBox>
)

export const Primary = Template.bind({})
Primary.args = {
  flexDirection: 'row',
  className: 'bg-success',
}

// export const Secondary = () => <FlexBox />;
