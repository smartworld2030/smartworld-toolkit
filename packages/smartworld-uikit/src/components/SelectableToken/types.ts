import { InputHTMLAttributes, ReactElement, ReactNode, ReactText } from 'react'
import { BoxProps } from '../Box'
import { Variant } from '../Button/types'

export interface SelectableTokenProps extends BoxProps {
  value?: ReactText
  text?: ReactText
  onImageError?: () => void
  innerRef?: React.RefObject<HTMLInputElement>
  currencyValue?: ReactNode
  currencyUnit?: ReactNode
  placeholder?: string
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'placeholder' | 'onChange'>
  decimals?: number
  image?: string
  unit: string | ReactElement
  variant?: Variant
  disabled?: boolean
  loading?: boolean
  onSelect: () => void
}
