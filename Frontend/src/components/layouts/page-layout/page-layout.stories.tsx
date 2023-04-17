import React from 'react'
import { Meta, Story } from '@/stories/story-types'
import { withTemplate } from '@/stories/with-template'
import { PageLayout } from './page-layout'
import { FlexBox } from '@/components/atoms'
import { PageLayoutProps } from './page-layout.props'

const meta: Meta<PageLayoutProps> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
}

type PageLayoutStory = Story<PageLayoutProps>

export default meta

const PageLayoutTemplate: React.FC<PageLayoutProps> = (args) => <PageLayout {...args} />

export const Primary: PageLayoutStory = {
  render: withTemplate(PageLayoutTemplate),
  args: {
    content: <FlexBox className="bg-base100" height="100vh" minHeight="100vh"></FlexBox>,
  },
}
