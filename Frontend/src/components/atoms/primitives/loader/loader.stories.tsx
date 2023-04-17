import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { Loader } from './loader'
import { LoaderProps } from './loader.props'

const meta: Meta<LoaderProps> = {
  title: 'Atoms/Primitives/Loader',
  component: Loader,
}

type LoaderStory = Story<LoaderProps>

export default meta

const LoaderTemplate: React.FC<LoaderProps> = (args) => <Loader {...args} />

export const Primary: LoaderStory = {
  render: withTemplate(LoaderTemplate),
  args: {},
}
