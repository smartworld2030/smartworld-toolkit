import styled from 'styled-components'
import { loading } from '../ProgressRing/styles'
import { ShadowSvg } from '../Svg'

export const LoadingCircle = styled.circle`
  fill: transparent;
  transform-origin: 50% 50%;
  stroke-linecap: round;
  animation: 1.5s ease-in-out infinite both
    ${({ strokeDashoffset }) => strokeDashoffset && loading(Number(strokeDashoffset))};
`
export const StyledGroup = styled.g<{ $transform: string }>`
  transform: ${({ $transform }) => $transform};
`

export const StyledShadowSvg = styled(ShadowSvg)<{ $zIndex: number; $cursor: string }>`
  box-sizing: border-box;
  touch-action: none;
  overflow: visible;
  z-index: ${({ $zIndex }) => $zIndex};
  cursor: ${({ $cursor }) => $cursor};
`
