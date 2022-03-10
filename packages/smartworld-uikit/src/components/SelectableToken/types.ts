import { InputHTMLAttributes, ReactNode, ReactText } from 'react'
import { BoxProps } from '../Box'
import { Variant } from '../Button/types'

export interface SelectableTokenBoxProps extends SelectableTokenProps, BoxProps {}
export interface SelectableTokenProps {
  id?: string
  token?: Token
  chainId?: ChainId
  value?: ReactText
  maxValue?: ReactText
  balance?: ReactText
  text?: ReactText
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  currencyUnit?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  decimals?: number
  blur?: number
  image?: string
  logoURI?: string | string[]
  unit?: string
  symbol?: string
  variant?: Variant
  stroked?: boolean
  disabled?: boolean
  loading?: boolean
  onTextClick?: () => void
}

export interface Token {
  chainId?: ChainId
  address?: string
  decimals?: number
  value?: string
  symbol?: string
  name?: string
  balance?: string
  logoURI?: string | string[]
  projectLink?: string
}

export declare enum ChainId {
  MAINNET = 56,
  TESTNET = 97,
}
