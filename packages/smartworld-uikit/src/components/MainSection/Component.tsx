import React, { ReactNode, useContext } from 'react'
import { Route, RouteProps } from 'react-router'
import styled from 'styled-components'
import { AnimatedFlex, Box, AnimatedTipFlex } from '../Box'
import { useWindowSize } from '../..'
import { MainContext } from './MainSection'
import { MainFlexProps } from '../Box/types'

export const Container = styled(Box)<{ flexDirection?: string; minheight?: string }>`
  position: relative;
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 0)}px;
  flex-flow: wrap;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  flex-direction: ${({ flexDirection }) => flexDirection};
  background-color: ${({ theme }) => theme.colors.background};
`

export const AbsoluteBody = styled(Box)`
  text-align: center;
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
`

export const MainRoute: React.FC<RouteProps> = (props) => {
  return <Route {...props} />
}

interface FlexWithTip {
  flex: number
  tip?: ReactNode
  tipSize?: number
  showTip?: boolean
  isMobile?: boolean
}

export const FlexWithTip: React.FC<FlexWithTip> = ({
  tip,
  flex,
  isMobile,
  tipSize = tip ? 6 : 0,
  showTip,
  children,
  ...rest
}) => {
  const t = tipSize * (flex / 12)
  const x = showTip ? t : 0
  return (
    <AnimatedFlex
      {...(isMobile ? { width: '100%', height: flex } : { width: flex, height: '100%' })}
      overflow="hidden"
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {tip && <AnimatedTipFlex {...(isMobile ? { height: x } : { width: x })}>{tip}</AnimatedTipFlex>}
      <AnimatedFlex {...rest} {...(isMobile ? { height: flex - x } : { width: flex - x })}>
        {children}
      </AnimatedFlex>
    </AnimatedFlex>
  )
}

export const MainComp = (props: MainFlexProps) => {
  const { showTip } = useContext(MainContext)
  const { flexSize } = useWindowSize()

  const { tip, demo, tipSize, children, flex = 12, ...ss } = props
  return (
    <FlexWithTip showTip={showTip} isMobile={true} flex={flex * flexSize} tip={tip} tipSize={tipSize} {...ss}>
      {children}
    </FlexWithTip>
  )
}
