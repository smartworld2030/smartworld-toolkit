import styled from 'styled-components'
import { loading } from '../ProgressRing/styles'

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
