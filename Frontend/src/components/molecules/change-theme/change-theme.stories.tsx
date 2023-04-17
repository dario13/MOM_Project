import { Meta, Story } from '@/stories/story-types'
import { ChangeTheme } from './change-theme'

const meta: Meta<typeof ChangeTheme> = {
  title: 'Molecules/ChangeTheme',
  component: ChangeTheme,
}

type ChangeThemeStory = Story<typeof ChangeTheme>

export const Primary: ChangeThemeStory = {
  args: {},
}

export default meta
