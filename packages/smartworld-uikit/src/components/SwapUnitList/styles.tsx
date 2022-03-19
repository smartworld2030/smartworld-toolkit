import styled, { keyframes } from 'styled-components'
import { Flex } from '../Box'
import { ListContainerProps } from './types'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

const ListContainer = styled(Flex)<ListContainerProps>`
  position: absolute;
  width: ${({ $width, listWidth }) => ($width * listWidth).toFixed()}px;
  height: ${({ $height, listHeight }) => ($height * listHeight).toFixed()}px;

  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;

  --scrollbar-width: ${({ scrollSize }) => scrollSize}px;
  --padding-height: ${({ $height, listHeight }) => (($height / 2) * listHeight - $height / 2).toFixed()}px;
  --mask-height: ${({ $height }) => ($height / 3).toFixed()}px;
  --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;
  --mask-image-scrollbar: linear-gradient(black, black);
  --mask-size-scrollbar: var(--scrollbar-width) 100%;
  --mask-image-content: linear-gradient(
    to bottom,
    transparent,
    black var(--mask-height),
    black calc(100% - var(--mask-height)),
    transparent
  );

  top: calc(var(--padding-height) * -1);
  left: 0;
  padding-top: var(--padding-height);
  padding-bottom: var(--padding-height);

  -webkit-mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
  -webkit-mask-size: var(--mask-size-content), var(--mask-size-scrollbar);
  -webkit-mask-position: 0 0, 100% 0;
  -webkit-mask-repeat: no-repeat, no-repeat;

  z-index: 20;
  visibility: ${({ out }) => (out ? 'hidden' : 'visible')};
  animation-name: ${({ out }) => (out ? fadeOut : fadeIn)};
  animation-duration:${({ animationTime }) => animationTime || 500}ms;
  transition: visibility ${({ animationTime }) => animationTime || 500}ms linear;

  ::-webkit-scrollbar {
    width: var(--scrollbar-width);
  }

  & > ${Flex} {
    position: sticky;
    top: calc(var(--padding-height) * -0.95);
    z-index: 21;
  }
}`

export default ListContainer
