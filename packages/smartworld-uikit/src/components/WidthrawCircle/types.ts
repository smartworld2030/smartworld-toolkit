import { ButtonHTMLAttributes, ReactNode, ReactText } from "react";

export interface WithdrawCircleProps {
  name?: ReactText;
  percent?: number;
  onClick: () => void;
  onUnitClick?: React.MouseEventHandler<HTMLDivElement>;
  onLogoClick?: React.MouseEventHandler<HTMLDivElement>;
  topElement?: ReactNode;
  bottomElement?: ReactNode;
  totalValue?: ReactNode;
  totalValueUnit?: ReactNode;
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLInputElement>, "color" | "variant" | "onClick">;
  isWarning?: boolean;
  size?: ReactText;
  color?: string;
  progressColor?: string;
  borderColor?: string;
  progressSize?: number;
  borderSize?: number;
  disabled?: boolean;
}
