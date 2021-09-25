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
  href: string
  icon: ReactNode
}

export interface NavProps {
  selected?: string
  links: MenuEntry[]
  userMenu?: ReactNode
  settingMenu?: ReactNode
  onChange: (value: string) => void
}
