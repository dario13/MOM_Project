import React from 'react'
import { Meta, Story } from '@/ioc/stories/story-types'
import { withTemplate } from '@/ioc/stories/with-template'
import { ChooseDifficulty } from './choose-difficulty'

const meta: Meta<typeof ChooseDifficulty> = {
  title: 'Organisms/ChooseDifficulty',
  component: ChooseDifficulty,
}

type ChooseDifficultyStory = Story<typeof ChooseDifficulty>

const ChooseDifficultyTemplate: React.FC = (args) => <ChooseDifficulty {...args} />

export const Primary: ChooseDifficultyStory = {
  render: withTemplate(ChooseDifficultyTemplate),
  args: {},
}

export default meta
