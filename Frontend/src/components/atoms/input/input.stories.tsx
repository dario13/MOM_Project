import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from './input'

export default {
  title: 'Atoms/Input',
  component: Input,
} as ComponentMeta<typeof Input>

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />

export const Primary = Template.bind({})
Primary.args = {
  label: 'Input Field',
  placeholder: 'type something',
}

export const WithPrefixAndSuffix = Template.bind({})

WithPrefixAndSuffix.args = {
  label: 'Amount in dollars',
  placeholder: '0.00',
  prefix: '$',
  suffix: 'USD',
}
