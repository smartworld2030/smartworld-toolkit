import { ButtonHTMLAttributes, ReactNode, ReactText } from 'react'
import { Variant } from '../Button/types'

export interface WithdrawCircleProps {
  name?: ReactText
  percent?: number
  onClick: () => void
  onUnitClick?: React.MouseEventHandler<HTMLDivElement>
  onLogoClick?: React.MouseEventHandler<HTMLDivElement>
  topElement?: ReactNode
  bottomElement?: ReactNode
  totalValue?: ReactNode
  totalValueUnit?: ReactNode
  buttonProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    variant?: Variant
    color?: string
    backgroundColor?: string
  }
  isWarning?: boolean
  size?: ReactText
  color?: string
  borderColor?: string
  borderSize?: number
  disabled?: boolean
  loading?: boolean
}
