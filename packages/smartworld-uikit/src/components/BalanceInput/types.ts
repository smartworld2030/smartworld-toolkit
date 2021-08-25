import { InputHTMLAttributes, ReactNode, ReactText } from "react";
import { BoxProps } from "../Box";

export interface BalanceInputProps extends BoxProps {
  value: ReactText;
  maxValue?: ReactText;
  onUserInput: (input: string) => void;
  innerRef?: React.RefObject<HTMLInputElement>;
  currencyValue?: ReactNode;
  currencyUnit?: ReactNode;
  placeholder?: string;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "placeholder" | "onChange">;
  isWarning?: boolean;
  decimals?: number;
  unit: string;
  knobColor?: string;
  progressColor?: string;
  switchEditingUnits?: () => void;
}
