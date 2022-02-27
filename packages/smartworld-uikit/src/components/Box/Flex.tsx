import styled from 'styled-components'
import { flexbox } from 'styled-system'
import { Colors } from '../../theme/types'
import Box from './Box'
import { FlexProps } from './types'

const Flex = styled(Box)<FlexProps & { variant?: keyof Colors }>`
  display: flex;
  ${flexbox};
  background: ${({ theme, variant }) => theme.colors[variant || 'transparent']};
`
export const ReverseFlex = styled(Box)<FlexProps>`
  display: flex;
  flex-direction: column-reverse;
  ${flexbox}
`

export const MainFlex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`

export const AnimatedFlex = styled(Box)<FlexProps>`
  display: flex;
  transition: 0.5s all;
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

export const PointerRelativeFlex = styled(Box)<FlexProps>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  text-align: center;
  user-select: none;
  cursor: pointer;
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
