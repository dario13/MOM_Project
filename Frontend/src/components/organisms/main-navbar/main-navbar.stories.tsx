import { Meta, Story } from '@/ioc/stories/story-types'
import { MainNavbar } from './main-navbar'

const meta: Meta<typeof MainNavbar> = {
  title: 'Organisms/MainNavbar',
  component: MainNavbar,
}

type MainNavbarStory = Story<typeof MainNavbar>

export const Primary: MainNavbarStory = {
  args: {},
}

export default meta
