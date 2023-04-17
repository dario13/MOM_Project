import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Image } from './image'
import logo from '../../../../../public/images/logo.png'
import { ImageProps } from 'next/image'

const meta: Meta<ImageProps> = {
  title: 'Atoms/Primitives/Image',
  component: Image,
}

type ImageStory = Story<ImageProps>

export default meta

const ImageTemplate: React.FC<ImageProps> = (args) => <Image {...args} />

export const Primary: ImageStory = {
  render: withTemplate(ImageTemplate),
  args: {
    src: 'https://placeimg.com/640/480/any',
    title: 'test',
    width: 300,
    height: 300,
  },
}

export const StaticImage: ImageStory = {
  render: withTemplate(ImageTemplate),
  args: {
    src: logo,
    title: 'logo',
    width: 300,
    height: 130,
  },
}
