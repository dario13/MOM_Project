import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { PageLayout } from './page-layout'
import { FlexBox } from '@/components/atoms'

export default {
  title: 'Layout/PageLayout',
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>

const Template: ComponentStory<typeof PageLayout> = (args) => <PageLayout {...args} />

export const Primary = Template.bind({})
Primary.args = {
  content: <FlexBox className="bg-base100" height="100vh" minHeight="100vh"></FlexBox>,
}
