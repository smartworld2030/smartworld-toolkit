import { ReactNode } from 'react'
import { Colors } from '../../theme/types'

export interface Language {
  code: string
  language: string
  locale: string
}

export interface PushedProps {
  isPushed: boolean
  pushNav: (isPushed: boolean) => void
}

export interface NavTheme {
  background: string
}

export interface LinkStatus {
  text: string
  color: keyof Colors
}

export interface MenuSubEntry {
  label: string
  href: string
  calloutClass?: string
  status?: LinkStatus
}

export interface MenuEntry {
  label: string
  path: string[]
  icon: ReactNode
}
export type ListItems = { links: MenuEntry[]; default: string }
export interface NavProps {
  width?: number
  background?: string
  selected?: string
  list?: ListItems
  leftSide?: ReactNode
  rightSide?: ReactNode
  onChange?: (value: string) => void
}
