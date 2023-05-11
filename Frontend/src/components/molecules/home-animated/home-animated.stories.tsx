import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { HomeAnimated } from './home-animated'
import { FlexBox } from '@/components/atoms'

const meta: Meta<typeof HomeAnimated> = {
  title: 'Molecules/HomeAnimated',
  component: HomeAnimated,
}

type HomeAnimatedStory = Story<typeof HomeAnimated>

const HomeAnimatedTemplate: React.FC = (args) => (
  <FlexBox height="100vh" width="100vw">
    <HomeAnimated {...args} />
  </FlexBox>
)

export const Primary: HomeAnimatedStory = {
  render: withTemplate(HomeAnimatedTemplate),
  args: {},
}

export default meta
