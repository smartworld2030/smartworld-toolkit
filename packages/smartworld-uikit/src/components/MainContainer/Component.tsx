import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AnimatedFlex, Flex, Box, AnimatedTipFlex } from '../Box'

export const Container = styled(Box)<{ flexDirection?: string; minheight?: string }>`
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100%')};
  min-height: ${({ minHeight }) => minHeight ?? minHeight}px;
  flex-flow: wrap;
  margin-left: auto;
  position: relative;
  margin-right: auto;
  box-sizing: border-box;
  flex-direction: ${({ flexDirection }) => flexDirection};
  background-color: ${({ theme }) => theme.colors.background};
`

interface FlexWithTip {
  size: number
  tip?: ReactNode
  tipSize?: number
  showTip?: boolean
  isMobile?: boolean
}

export const FlexWithTip: React.FC<FlexWithTip> = ({
  tip,
  size,
  isMobile,
  tipSize = tip ? 6 : 0,
  showTip,
  children,
}) => {
  const t = tipSize * (size / 12)
  const x = showTip ? t : 0

  return (
    <Flex
      {...(isMobile ? { width: '100%', height: size } : { width: size, height: '100%' })}
      overflow="hidden"
      flexDirection={isMobile ? 'column' : 'row'}
    >
      {tip && <AnimatedTipFlex {...(isMobile ? { height: x } : { width: x })}>{tip}</AnimatedTipFlex>}
      <AnimatedFlex {...(isMobile ? { height: size - x } : { width: size - x })}>{children}</AnimatedFlex>
    </Flex>
  )
}
