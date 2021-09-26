import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Box/Flex'
import { NavProps } from './types'
import { MENU_HEIGHT } from './config'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const StyledNav = styled.nav`
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Menu: React.FC<NavProps> = ({ rightSide, links, selected, leftSide, onChange }) => {
  const item = links.find((link) => link.href === selected)
  return (
    <Wrapper>
      <StyledNav>
        <Flex flex="4" justifyContent="start">
          {leftSide}
        </Flex>
        <Flex flex="4" justifyContent="center">
          {item?.icon}
          <Select value={selected} onChange={(e) => onChange(e.currentTarget.value)}>
            {Object.values(links).map((link, i) => (
              <option key={i} value={link.href}>
                {link.label}
              </option>
            ))}
          </Select>
        </Flex>
        <Flex flex="4" justifyContent="end">
          {rightSide}
        </Flex>
      </StyledNav>
    </Wrapper>
  )
}

export default Menu
