import { darkColors, lightColors } from "../../theme/colors";
import { SmartWorldToggleTheme } from "./types";

export const light: SmartWorldToggleTheme = {
  handleBackground: lightColors.backgroundAlt,
  handleShadow: lightColors.textDisabled,
};

export const dark: SmartWorldToggleTheme = {
  handleBackground: darkColors.backgroundAlt,
  handleShadow: darkColors.textDisabled,
};
