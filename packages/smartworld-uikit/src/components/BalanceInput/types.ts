import { InputHTMLAttributes, ReactElement, ReactNode, ReactText } from 'react'
import { BoxProps } from '../Box'

export interface BalanceInputProps extends BoxProps {
  value: ReactText
  maxValue?: ReactText
  onUserInput: (input: string) => void
  onUnitClick?: React.MouseEventHandler<HTMLDivElement>
  onLogoClick?: React.MouseEventHandler<HTMLDivElement>
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  currencyUnit?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  isWarning?: boolean
  decimals?: number
  logo?: ReactElement
  unit: string | ReactElement
  knobColor?: string
  progressColor?: string
  borderColor?: string
  progressSize?: number
  borderSize?: number
  knobSize?: number
  debounceTime?: number
  maxWait?: number
  disabledKnob?: boolean
  disabled?: boolean
  switchEditingUnits?: () => void
}
