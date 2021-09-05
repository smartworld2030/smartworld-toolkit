import React from "react";
import styled from "styled-components";
import Flex from "../../../../components/Box/Flex";
import { WalletIcon } from "../../../../components/Svg";
import { UserMenuProps, variants } from "./types";
import MenuIcon from "./MenuIcon";
import { UserMenuItem } from "./styles";

const StyledUserMenu = styled(Flex)`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.tertiary};
  border-radius: ${({ theme }) => theme.radii.default};
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  padding-left: 10px;
  padding-right: 8px;
  position: relative;

  &:hover {
    opacity: 0.65;
  }
`;

const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  display: none;
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
    margin-left: 8px;
    margin-right: 4px;
  }
`;

const Menu = styled.div<{ isOpen: boolean }>`
  background-color: ${({ theme }) => theme.card.background};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.default};
  padding-bottom: 4px;
  padding-top: 4px;
  pointer-events: auto;
  width: 280px;
  visibility: visible;
  z-index: 1001;

  ${({ isOpen }) =>
    !isOpen &&
    `
    pointer-events: none;
    visibility: hidden;
  `}

  ${UserMenuItem}:first-child {
    border-radius: 8px 8px 0 0;
  }

  ${UserMenuItem}:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const UserMenu: React.FC<UserMenuProps> = ({
  account,
  text,
  avatarSrc,
  variant = variants.DEFAULT,
  children,
  ...props
}) => {
  const accountEllipsis = account ? `${account.substring(0, 2)}...${account.substring(account.length - 4)}` : null;

  return (
    <StyledUserMenu {...props}>
      <MenuIcon variant={variant}>
        <WalletIcon />
      </MenuIcon>
      <LabelText title={text || account}>{text || accountEllipsis}</LabelText>
    </StyledUserMenu>
  );
};

export default UserMenu;
