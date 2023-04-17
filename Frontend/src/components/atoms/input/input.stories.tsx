import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Input } from './input'
import { IMask } from 'react-imask'
import { InputProps } from './input.props'

const meta: Meta<InputProps> = {
  title: 'Atoms/Input',
  component: Input,
}

type InputStory = Story<InputProps>

export default meta

const InputTemplate: React.FC = (args) => <Input {...args} />

export const Primary: InputStory = {
  render: withTemplate(InputTemplate),
  args: {
    label: 'Input Field',
    placeholder: 'type something',
  },
}

export const WithPrefixAndSuffix: InputStory = {
  render: withTemplate(InputTemplate),
  args: {
    label: 'Amount in dollars',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
  },
}

export const WithDateMask: InputStory = {
  render: withTemplate(InputTemplate),
  args: {
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
  },
}
