import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
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
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const Menu: React.FC<NavProps> = ({ userMenu, logo, title, globalMenu }) => {
  const [, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

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
