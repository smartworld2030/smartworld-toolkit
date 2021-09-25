import styled, { keyframes } from 'styled-components'
import { Button } from '../Button'
import { BaseButtonProps, PolymorphicComponent } from '../Button/types'

const rotateY = keyframes`
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(1.9);
  }
  45% {
    transform: scale(1);
  }
  66% {
    transform: scale(1.9);
  }
  80% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.9);
  }
`

const AnimatedButton: PolymorphicComponent<
  BaseButtonProps & { done: boolean; animate: boolean; transition: number },
  'button'
> = styled(Button)<BaseButtonProps>`
  padding: 0;
  border-color: ${({ done, theme }) => done && theme.colors.success};
  animation: ${({ animate, transition }) => (animate ? transition : undefined)}ms ${rotateY};
  animation-fill-mode: forwards;
`

export default AnimatedButton
