import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Input } from './input'
import { IMask } from 'react-imask'

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

export const WithDateMask = Template.bind({})

WithDateMask.args = {
  label: 'Date',
  placeholder: 'DD.MM.YYYY',

  mask: {
    options: {
      mask: Date,
      overwrite: true,
      lazy: false,
      autofix: true,
      blocks: {
        d: { mask: IMask.MaskedRange, placeholderChar: 'D', from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, placeholderChar: 'M', from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, placeholderChar: 'Y', from: 1900, to: 2999, maxLength: 4 },
      },
    },
  },
}
