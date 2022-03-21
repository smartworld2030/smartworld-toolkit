import { animated } from 'react-spring'
import styled from 'styled-components'
import { Box } from '../Box'
import { MainFlexProps } from '../Box/types'

interface ContainerProps extends MainFlexProps {
  background?: string
  minHeight?: string
}

export const MenuItems = styled.div<{ position?: string }>`
  flex: 4;
  position: relative;
  & > svg {
    position: absolute;
    top: 0;
    ${({ position }) => position};
  }
`

export const Wrapper = styled.div<{ width?: number; background?: string }>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: ${({ theme, background }) => background || theme.colors.background};
`

export const StyledNav = styled.nav<{ height?: number }>`
  position: relative;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${({ height }) => height || 32}px;
  z-index: 20;
  transform: translate3d(0, 0, 0);
`

export const Container = styled(Box)<ContainerProps>`
  position: relative;
  display: flex;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => height};
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
export const StyledAnimated = styled(animated.div)<{ width?: number; height?: number; background?: string }>`
  display: flex;
  position: absolute;
  overflow-x: hidden;
  flex-direction: column;
  justify-content: space-between;
  transform: translateZ(-1000px);
  background: ${({ background }) => background};
  min-height: 100vh;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  left: 0;
  top: 0;
`
