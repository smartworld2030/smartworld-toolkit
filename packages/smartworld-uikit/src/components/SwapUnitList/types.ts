import { Colors } from '../../theme/types'
import { BalanceInputProps } from '../BalanceInput'
import { SelectableTokenProps } from '../SelectableToken'

export interface SwapUnitListProps extends Omit<BalanceInputProps, 'size' | 'unit' | 'selectable'> {
  size?: number
  unit?: string
  listWidth?: number
  listHeight?: number
  scrollSize?: number
  animationTime?: number
  listBackground?: keyof Colors
  topElement?: JSX.Element
  bottomElement?: JSX.Element
  defaultSelected?: number | string
  showList?: boolean
  setShowList?: (arg?: boolean) => void
  onUnitSelect?: (arg?: string) => void
  onTokenSelect?: (arg?: SelectableTokenProps) => void
  onMissClick?: () => void
  tokenList: SelectableTokenProps[]
}

export interface ListContainerProps {
  out: boolean
  $width: number
  $height: number
  listWidth: number
  listHeight: number
  scrollSize: number
  animationTime?: number
}

export type TokenDivList = { [key: string]: HTMLDivElement }
