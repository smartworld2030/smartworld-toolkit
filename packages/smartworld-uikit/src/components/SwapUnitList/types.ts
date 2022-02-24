import { ReactText } from 'react'
import { Colors } from '../../theme/types'
import { BalanceInputProps } from '../BalanceInput'
import { SelectableTokenProps, Token } from '../SelectableToken'

export interface SwapUnitListProps extends Omit<BalanceInputProps, 'unit' | 'selectable'> {
  unit?: string
  width?: ReactText
  height?: ReactText
  background?: keyof Colors
  topElement?: JSX.Element
  bottomElement?: JSX.Element
  defaultSelected?: number
  selectedItem?: (arg?: string) => void
  selectedToken?: (arg?: Token) => void
  tokenList?: SelectableTokenProps[]
  children?: (props: { onClick: (index: number, item: string, token: Token) => void }) => JSX.Element[]
}

export type TokenDivList = { [key: string]: HTMLDivElement }
