import React, { useContext } from 'react'
import { Flex, AnimatedFlex, AnimatedTipFlex } from '../Box'
import { MainFlexProps } from '../Box/types'
import MainSectionContext from './context'
import { MenuItems, StyledNav, Wrapper } from './styles'
import { MainSectionMenuProps, FlexWithTipProps } from './types'

export const MainSectionMenu: React.FC<MainSectionMenuProps> = ({
  rightSide,
  width,
  background,
  children,
  leftSide,
}) => {
  return (
    <Wrapper background={background} width={width}>
      <StyledNav>
        <MenuItems position="left:0">{leftSide}</MenuItems>
        <Flex flex="4" justifyContent="center">
          {children}
        </Flex>
        <MenuItems position="right:0">{rightSide}</MenuItems>
      </StyledNav>
    </Wrapper>
  )
}

export const FlexWithTip: React.FC<FlexWithTipProps> = ({
  tip,
  flex,
  isMobile,
  tipSize = tip ? 6 : 0,
  showTip,
  overflow = 'hidden',
  children,
  ...rest
}) => {
  const t = tipSize * (flex / 12)
  const x = showTip ? t : 0

  return (
    <AnimatedFlex
      {...(isMobile ? { width: '100%', height: flex } : { width: flex, height: '100%' })}
      overflow={overflow}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {tip && <AnimatedTipFlex {...(isMobile ? { height: x } : { width: x })}>{tip}</AnimatedTipFlex>}
      <AnimatedFlex overflow={overflow} {...rest} {...(isMobile ? { height: flex - x } : { width: flex - x })}>
        {children}
      </AnimatedFlex>
    </AnimatedFlex>
  )
}

const MainComponent: React.FC<MainFlexProps> = ({
  tip,
  demo,
  loading,
  overflow,
  tipSize,
  children,
  flex = 12,
  ...ss
}) => {
  const {
    sizes: { flexSize },
    toggle: { showTip },
  } = useContext(MainSectionContext)

  return (
    <FlexWithTip
      isMobile
      tip={tip}
      tipSize={tipSize}
      showTip={showTip}
      overflow={overflow}
      flex={flex * flexSize}
      {...ss}
    >
      {loading ? demo : children}
    </FlexWithTip>
  )
}

export default MainComponent
