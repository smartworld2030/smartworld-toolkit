import { ReactText } from 'react'
import styled from 'styled-components'
import { Flex } from '../Box'

const ListContainer = styled(Flex)<{ width: ReactText; height: ReactText }>`
  overflow:auto;
  position:absolute;
  justify-content:space-between;
  align-items:center;
  flex-direction:column;
  --scrollbar-width: 8px;
  --mask-height: 32px;
  overflow-y: auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding-top: var(--mask-height);
  padding-bottom: var(--mask-height);
  padding-right: 20px;
  --mask-image-content: linear-gradient(
    to bottom,
    transparent,
    black var(--mask-height),
    black calc(100% - var(--mask-height)),
    transparent
  );
  --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

  --mask-image-scrollbar: linear-gradient(black, black);
  --mask-size-scrollbar: var(--scrollbar-width) 100%;
  mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
  mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

  mask-position: 0 0, 100% 0;
  mask-repeat: no-repeat, no-repeat;

  z-index: 20;
}`
export default ListContainer
