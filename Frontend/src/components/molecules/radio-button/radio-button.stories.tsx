import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { RadioButton } from './radio-button'
import { RadioButtonProps } from './radio-button.props'
import { FlexBox, Text } from '@/components/atoms'
import { Controller, useForm } from 'react-hook-form'

const meta: Meta<RadioButtonProps> = {
  title: 'Atoms/CardRadioButton',
  component: RadioButton,
}

type RadioCardButtonStory = Story<RadioButtonProps>

const RadioCardTemplate: React.FC = () => (
  <RadioButton value={'1'} onChange={() => ({})}>
    <Text>{'Test1'}</Text>
  </RadioButton>
)

const options = [
  { value: 'option1', name: 'option1', children: <Text>{'Test1'}</Text> },
  { value: 'option2', name: 'option2', children: <Text>{'Test2'}</Text> },
  { value: 'option3', name: 'option3', children: <Text>{'Test3'}</Text> },
]

const RadioCardFormTemplate: React.FC = () => {
  const { control } = useForm()
  return (
    <FlexBox flexDirection="row">
      {options.map((option, index) => (
        <Controller
          key={index}
          control={control}
          name="selectedOption"
          render={({ field: { onChange, value } }) => (
            <RadioButton value={option.value} onChange={onChange} checked={value === option.value}>
              {option.children}
            </RadioButton>
          )}
        />
      ))}
    </FlexBox>
  )
}

export const Primary: RadioCardButtonStory = {
  render: withTemplate(RadioCardTemplate),
}

export const WithForm: RadioCardButtonStory = {
  render: withTemplate(RadioCardFormTemplate),
}

export default meta
