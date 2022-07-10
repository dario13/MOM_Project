import React from 'react'
import { FlexBoxProps } from './flex-box.props'
import { StyledFlexBox } from './flex-box.styles'

const FlexBox = (props: FlexBoxProps) => {
  const {
    alignItems,
    children,
    className,
    dataTheme,
    display = 'flex',
    flex = '1 1 0px',
    flexBasis,
    flexDirection = 'column',
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    style,
    ref,
    onClick,
    ...rest
  } = props

  return (
    <StyledFlexBox
      display={display}
      alignItems={alignItems}
      flex={flex}
      flexBasis={flexBasis}
      flexDirection={flexDirection}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
      flexWrap={flexWrap}
      justifyContent={justifyContent}
      className={className}
      data-testid="FlexBox"
      style={style}
      ref={ref}
      data-theme={dataTheme}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledFlexBox>
  )
}

FlexBox.displayName = 'FlexBox'

export { FlexBox }
