import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Text } from './text'

export default {
  title: 'Atoms/Primitives/Text',
  component: Text,
} as ComponentMeta<typeof Text>

const simpleTemplate: ComponentStory<typeof Text> = (args) => {
  return <Text {...args} />
}

export const Primary = simpleTemplate.bind({})

Primary.args = {
  size: 'lg',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue leo, venenatis eu turpis nec, tincidunt maximus tortor. Donec suscipit hendrerit orci, et fringilla purus imperdiet sed. Pellentesque mattis dictum dui, at egestas massa fermentum sed. Phasellus sed ante at quam faucibus sodales at vitae risus. Suspendisse tempor, urna eget hendrerit tempor, magna nisl malesuada erat, vel tempus est turpis eget erat. Aenean sollicitudin, sapien eget rutrum placerat, libero urna dignissim nulla, quis condimentum lectus erat at elit. Integer in orci imperdiet, maximus ipsum eget, finibus metus. Fusce vestibulum, sem nec maximus consectetur, ipsum dolor sagittis augue, vel pulvinar enim turpis pretium arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst. Etiam euismod purus vel justo pharetra facilisis. Aliquam imperdiet ante nulla.',
}

const compositeTemplate: ComponentStory<typeof Text> = (args) => {
  return (
    <>
      <Text {...args}>
        <Text text="A text example. " />
        <Text text="Another text" />
      </Text>
    </>
  )
}

export const Composite = compositeTemplate.bind({})

Composite.args = {
  align: 'center',
  size: 'md',
}
