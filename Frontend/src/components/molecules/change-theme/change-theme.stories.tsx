import { Meta, Story } from '@/ioc/stories/story-types'
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
