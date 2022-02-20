import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Box/Flex'
import { NavProps } from './types'
import { MENU_HEIGHT } from './config'

const MenuItems = styled.div<{ position?: string }>`
  flex: 4;
  position: relative;
  & > svg {
    position: absolute;
    top: 0;
    ${({ position }) => position};
  }
`

const Wrapper = styled.div<{ width?: string; background?: string }>`
  width: ${({ width }) => width || '100%'};
  background: ${({ theme, background }) => background || theme.colors.background};
`

const StyledNav = styled.nav`
  position: relative;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  z-index: 20;
  transform: translate3d(0, 0, 0);
`
const Select = styled.select`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
  font-size: 1em;
  min-width: 100px;
  &:focus {
    outline: none;
  }
`

const Menu: React.FC<NavProps> = ({
  rightSide,
  width,
  background,
  list,
  selected,
  leftSide,
  onChange = () => null,
}) => {
  const item = list?.links?.find((link) => link.path.some((p) => p === selected))
  return (
    <Wrapper background={background} width={width ? `${width}px` : undefined}>
      <StyledNav>
        <MenuItems position="left:0">{leftSide}</MenuItems>
        <Flex flex="4" justifyContent="center">
          {item?.icon}
          {list && (
            <Select value={selected} onChange={(e) => onChange(e.currentTarget.value)}>
              {Object.values(list.links).map((link) => (
                <option key={link.label} value={link.path[0]}>
                  {link.label}
                </option>
              ))}
            </Select>
          )}
        </Flex>
        <MenuItems position="right:0">{rightSide}</MenuItems>
      </StyledNav>
    </Wrapper>
  )
}

export default Menu
