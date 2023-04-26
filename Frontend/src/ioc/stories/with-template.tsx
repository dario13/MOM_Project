import React, { ComponentType } from 'react'

const withTemplate = <Props extends object>(TemplateComponent: ComponentType<Props>) => {
  /* eslint-disable react/display-name */
  return (args: Props) => <TemplateComponent {...args} />
}

withTemplate.displayName = 'withTemplate'

export { withTemplate }
