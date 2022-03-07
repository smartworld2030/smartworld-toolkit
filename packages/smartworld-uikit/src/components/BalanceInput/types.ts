import { InputHTMLAttributes, ReactElement, ReactNode, ReactText } from 'react'
import { BoxProps } from '../Box'
import { Token } from '../SelectableToken'

export interface BalanceInputProps extends BoxProps {
  token?: Token
  value: ReactText
  maxValue?: ReactText
  balance?: ReactText
  onUserInput?: (input: string) => void
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
  image?: string | string[]
  unit?: string | ReactElement
  knobColor?: string
  progressColor?: string
  borderColor?: string
  progressSize?: number
  borderSize?: number
  knobSize?: number
  debounceTime?: number
  maxWait?: number
  disabledKnob?: boolean
  selectable?: boolean
  disabled?: boolean
  loading?: boolean
  switchEditingUnits?: () => void
}
