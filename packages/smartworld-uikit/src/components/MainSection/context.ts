import { createContext } from 'react'
import { initValue } from '../../hooks/useWindowSize/useWindowSize'

export const defaultToggle = {
  sizes: initValue,
  toggle: {
    showTip: false,
    showRight: false,
    showLeft: false,
  },
}

const MainSectionContext = createContext(defaultToggle)

export default MainSectionContext
