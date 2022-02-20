import React, { useContext } from 'react'
import { useWindowSize } from '../../hooks'
import { MainFlexProps } from '../Box/types'
import { FlexWithTip } from './Component'
import { MainContext } from './MainSection'

const MainComponent: React.FC<MainFlexProps> = (props) => {
  const { showTip } = useContext(MainContext)
  const { flexSize } = useWindowSize()

  const { tip, demo, loading, overflow, tipSize, children, flex = 12, ...ss } = props
  return (
    <FlexWithTip
      showTip={showTip}
      overflow={overflow}
      isMobile
      flex={flex * flexSize}
      tip={tip}
      tipSize={tipSize}
      {...ss}
    >
      {loading ? demo : children}
    </FlexWithTip>
  )
}

export default MainComponent
