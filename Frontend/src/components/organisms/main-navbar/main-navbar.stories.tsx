import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { MainNavbar } from './main-navbar'
import { Image } from '@/components/atoms'
import logo from '../../../../public/images/logo.png'

export default {
  title: 'Organisms/MainNavbar',
  component: MainNavbar,
} as ComponentMeta<typeof MainNavbar>

const Template: ComponentStory<typeof MainNavbar> = (args) => <MainNavbar {...args} />

export const Primary = Template.bind({})
Primary.args = {
  menuItems: [
    { label: 'Example item 1', onClick: () => ({}) },
    { label: 'Example item 2', onClick: () => ({}) },
    { label: 'Example item 3', onClick: () => ({}) },
    { label: 'Start', color: 'primary', onClick: () => ({}) },
  ],
  logo: <Image src={logo} width={100} height={50} title="logo" />,
}
