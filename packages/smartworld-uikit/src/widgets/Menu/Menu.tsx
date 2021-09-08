import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import Logo from "./components/Logo";
import { NavProps } from "./types";
import { MENU_HEIGHT } from "./config";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav`
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: ${MENU_HEIGHT}px;
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const Menu: React.FC<NavProps> = ({ userMenu, logo, title, globalMenu }) => {
  return (
    <Wrapper>
      <StyledNav>
        <Flex flex="4" justifyContent="start">
          {globalMenu}
        </Flex>
        <Flex flex="4" justifyContent="center">
          <Logo innerLogo={logo} title={title} />
        </Flex>
        <Flex flex="4" justifyContent="end">
          {userMenu}
        </Flex>
      </StyledNav>
    </Wrapper>
  );
};

export default Menu;
