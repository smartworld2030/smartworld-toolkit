import styled from "styled-components";
import Button from "./Button";
import { BaseButtonProps, PolymorphicComponent } from "./types";

const IconButton: PolymorphicComponent<BaseButtonProps, "button"> = styled(Button)<BaseButtonProps>`
  padding: 0;
  background-color: ${({ theme }) => theme.colors.backgroundTransparent};
  width: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};
`;

export default IconButton;
