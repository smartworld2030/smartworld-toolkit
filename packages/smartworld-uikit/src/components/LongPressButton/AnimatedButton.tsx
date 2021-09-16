import styled, { keyframes } from 'styled-components'
import { Button } from '../Button'
import { BaseButtonProps, PolymorphicComponent } from '../Button/types'
import theme from '../Message/theme'

const rotateY = keyframes`
  0% {
    transform: scale(1);
  }
  15% {
    transform: scale(1.3);
  }
  30% {
    transform: scale(1);
  }
  45% {
    transform: scale(1.5);
  }
  65% {
    transform: scale(1.3);
  }
  80% {
    transform: scale(1.7);
  }
  90% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(2);
  }
`

const AnimatedButton: PolymorphicComponent<
  BaseButtonProps & { done: boolean; start: boolean; transition: number },
  'button'
> = styled(Button)<BaseButtonProps>`
  padding: 0;
  border-color: ${({ done, theme }) => done && theme.colors.success};
  animation: ${({ start, transition }) => (start ? transition : undefined)}ms ${rotateY};
  animation-fill-mode: forwards;
`

export default AnimatedButton
