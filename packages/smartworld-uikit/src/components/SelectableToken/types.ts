import { InputHTMLAttributes, ReactNode, ReactText } from 'react'
import { BoxProps } from '../Box'
import { Variant } from '../Button/types'

export interface SelectableTokenBoxProps extends SelectableTokenProps, BoxProps {}
export interface SelectableTokenProps {
  token?: Token
  address?: string
  value?: ReactText
  maxValue?: ReactText
  balance?: ReactText
  text?: ReactText
  onImageError?: () => void
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  currencyUnit?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  decimals?: number
  image?: string
  logoURI?: string
  unit?: string
  symbol?: string
  variant?: Variant
  stroked?: boolean
  disabled?: boolean
  loading?: boolean
  onTextClick?: () => void
}

export interface Token {
  chainId: string
  address: string
  decimals: number
  symbol?: string
  name?: string
  logoURI?: string
}
