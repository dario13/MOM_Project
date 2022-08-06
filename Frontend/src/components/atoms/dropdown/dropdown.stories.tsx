import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Dropdown } from './dropdown'
import { FlexBox, Text } from '../primitives'
import { Button } from '../button'
import { Card } from '../card'

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>

const WIthMenuTemplate: ComponentStory<typeof Dropdown> = (args) => (
  <FlexBox
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100%"
    padding="0"
    margin="0"
  >
    <Dropdown
      {...args}
      toggleElement={<Button>Toggle</Button>}
      content={[
        { label: 'Example item 1', onClick: () => ({}) },
        { label: 'Example item 2', onClick: () => ({}) },
        { label: 'Example item 3', color: 'primary', onClick: () => ({}) },
      ]}
    />
  </FlexBox>
)

export const WithMenu = WIthMenuTemplate.bind({})
WithMenu.args = {}

const WIthCardTemplate: ComponentStory<typeof Dropdown> = (args) => (
  <FlexBox
    alignItems="center"
    justifyContent="center"
    height="100vh"
    width="100%"
    padding="0"
    margin="0"
  >
    <Dropdown
      {...args}
      toggleElement={<Button>Toggle</Button>}
      content={
        <Card color="secondary">
          <FlexBox gap="0.5rem" width="20rem" padding="1rem">
            <Text size="lg" bold text={'This is an example title inside a Card'} align="center" />
            <Text text={'This is an example text description.'} />
          </FlexBox>
        </Card>
      }
    />
  </FlexBox>
)

export const WithCard = WIthCardTemplate.bind({})
WithCard.args = {}
