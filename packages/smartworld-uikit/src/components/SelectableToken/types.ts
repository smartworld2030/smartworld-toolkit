import { InputHTMLAttributes, ReactNode, ReactText } from 'react'
import { Colors } from '../../theme/types'
import { BalanceInputProps } from '../BalanceInput'
import { BoxProps } from '../Box'
import { Variant } from '../Button/types'

export interface SelectableTokenProps extends BoxProps {
  value?: ReactText
  maxValue?: ReactText
  text?: ReactText
  onImageError?: () => void
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  currencyUnit?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  decimals?: number
  image?: string
  unit: string
  variant?: Variant
  stroked?: boolean
  disabled?: boolean
  loading?: boolean
  onSelect?: () => void
}

export interface SwapUnitListProps extends Omit<BalanceInputProps, 'unit' | 'selectable'> {
  unit?: string
  width?: ReactText
  height?: ReactText
  background?: keyof Colors
  topElement?: JSX.Element
  bottomElement?: JSX.Element
  selectedUnit: (arg: string) => void
  tokenList: TokenSelect[]
}

export interface TokenSelect {
  unit: string
  maxValue: string
  image: string
}

export type TokenDivList = { [key: string]: HTMLDivElement }
