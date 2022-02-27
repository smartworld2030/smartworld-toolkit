import { ReactText } from 'react'
import { Colors } from '../../theme/types'
import { BalanceInputProps } from '../BalanceInput'
import { SelectableTokenProps } from '../SelectableToken'

export interface SwapUnitListProps extends Omit<BalanceInputProps, 'unit' | 'selectable'> {
  unit?: string
  width?: ReactText
  height?: ReactText
  animationTime?: number
  listBackground?: keyof Colors
  topElement?: JSX.Element
  bottomElement?: JSX.Element
  defaultSelected?: number
  selectUnitHandler?: (arg?: string) => void
  selectTokenHandler?: (arg?: SelectableTokenProps) => void
  tokenList: SelectableTokenProps[]
}

export type TokenDivList = { [key: string]: HTMLDivElement }
