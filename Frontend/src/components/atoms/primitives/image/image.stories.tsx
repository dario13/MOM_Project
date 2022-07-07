import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Image } from './image'
import logo from '../../../../../public/images/logo.png'

export default {
  title: 'Atoms/Primitives/Image',
  component: Image,
} as ComponentMeta<typeof Image>

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />

export const Primary = Template.bind({})
Primary.args = {
  src: 'https://placeimg.com/640/480/any',
  title: 'test',
  width: 300,
  height: 300,
}

export const StaticImage = Template.bind({})
StaticImage.args = {
  src: logo,
  title: 'logo',
  width: 300,
  height: 130,
}
