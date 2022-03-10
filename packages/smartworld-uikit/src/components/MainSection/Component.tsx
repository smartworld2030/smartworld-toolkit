import React, { ReactNode } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import styled from 'styled-components'
import { AnimatedFlex, Box, AnimatedTipFlex } from '../Box'
import { BoxProps, MainFlexProps } from '../Box/types'

interface ContainerProps extends MainFlexProps {
  background?: string
  minHeight?: string
}

export const Container = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || undefined};
  min-height: ${({ minHeight }) => minHeight || 0}px;
  flex-flow: wrap;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  flex-direction: ${({ flexDirection }) => flexDirection};
  background-color: ${({ theme, background }) => background || theme.colors.background};
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

interface FlexWithTip extends BoxProps {
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