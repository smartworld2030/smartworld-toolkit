import styled from 'styled-components'
import { flexbox } from 'styled-system'
import Box from './Box'
import { FlexProps, MainFlexProps } from './types'

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export const MainFlex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export const MainComp = styled(Box)<MainFlexProps>`
  display: flex;
  ${flexbox}
`

export const AnimatedFlex = styled(Box)<FlexProps>`
  display: flex;
  transition: 0.5s all;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background};
  ${flexbox};
`

export const AnimatedTipFlex = styled(Box)<FlexProps>`
  display: flex;
  transition: 0.5s all;
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  box-shadow: ${({ theme }) => theme.shadows.tip};
  overflow: hidden;
  ${flexbox};
`

export const RelativeFlex = styled(Box)<FlexProps>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  text-align: center;
  user-select: none;
  ${flexbox}
`

export const FullFlex = styled(Box)<FlexProps>`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  ${flexbox}
`

export const AbsoluteFlex = styled(Box)<FlexProps>`
  display: flex;
  position: absolute;
  ${flexbox}
`

export default Flex
