import React, { useContext } from 'react'
import { useWindowSize } from '../../hooks'
import { MainFlexProps } from '../Box/types'
import { FlexWithTip } from './Component'
import { MainContext } from './MainSection'

const MainComponent: React.FC<MainFlexProps> = (props) => {
  const { showTip } = useContext(MainContext)
  const { flexSize } = useWindowSize()

  const { tip, demo, tipSize, children, flex = 12, ...ss } = props
  return (
    <FlexWithTip showTip={showTip} isMobile flex={flex * flexSize} tip={tip} tipSize={tipSize} {...ss}>
      {children}
    </FlexWithTip>
  )
}

export default MainComponent
