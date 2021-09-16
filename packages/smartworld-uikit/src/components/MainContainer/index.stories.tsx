import React, { useState } from 'react'
import FlexComponent, { AnimatedTipFlex } from '../Box/Flex'
import MainContainer from './MainContainer'
import Text from '../Text/Text'
import { Toggle } from '../Toggle'
import { Button } from '../Button'

export default {
  title: 'Components/MainContainer',
  component: MainContainer,
  argTypes: {},
}

const defaultToggle = {
  showTip: false,
  showUser: false,
  showSetting: false,
}
interface ChildProps {
  isMobile?: boolean
  isTablet?: boolean
  screen?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
export const MainSection: React.FC = () => {
  const [toggle, setToggle] = useState(defaultToggle)

  const toggleHandler = (item: string) => {
    setToggle((prev) => ({ ...defaultToggle, [item]: !prev[item] }))
  }
  const { showSetting, showUser, showTip } = toggle
  const toggled = showSetting || showUser
  const Childs = ({ isMobile, isTablet }: ChildProps) => [
    {
      size: toggled ? 5 : 6,
      md: 12,
      xs: 12,
      items: [
        {
          size: 3,
          item: (
            <FlexComponent
              {...(isMobile ? { width: '100%' } : { height: '100%' })}
              flexDirection={isMobile ? 'row' : 'column'}
              justifyContent="space-around"
            >
              {[0, 1, 2].map((i) => (
                <Button key={i} shape="circle" scale="lg" value="BNB" />
              ))}
            </FlexComponent>
          ),
          tip: { item: 'lorem1 ipsum' },
        },
        {
          size: 6,
          item: <Button shape="circle" size="200px" />,
          tip: { item: 'lorem ipsum 2', size: 4 },
        },
        {
          size: 3,
          item: <Button shape="circle" size="80px" />,
        },
      ],
    },
    {
      size: toggled ? 2 : 3,
      md: 6,
      xs: 4,
      items: [
        {
          size: 12,
          item: <Button shape="circle" size="200px" />,
          tip: { item: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, vero.', size: 3 },
        },
      ],
    },
    {
      size: toggled ? 2 : 3,
      md: 6,
      xs: 4,
      items: [
        {
          size: 12,
          item: <Button shape="circle" size="80px" />,
          tip: { item: 'Lorem ipsum, dolor sit amet con' },
        },
      ],
    },
  ]

  return (
    <FlexComponent flexDirection="column">
      <FlexComponent justifyContent="space-between">
        <Text color="primary" display="flex">
          <Toggle checked={showSetting} onChange={() => toggleHandler('showSetting')} />
        </Text>
        <Text color="primary" display="flex">
          <Toggle checked={showTip} onChange={() => toggleHandler('showTip')} />
        </Text>
        <Text color="primary" display="flex">
          <Toggle checked={showUser} onChange={() => toggleHandler('showUser')} />
        </Text>
      </FlexComponent>
      <MainContainer
        backgroundColor="#7645D9"
        showTip={showTip}
        right={({ responsiveSize }) => (
          <AnimatedTipFlex {...responsiveSize(3, showUser)} flexDirection="column" justifyContent="space-around">
            <div>USER MENU</div>
          </AnimatedTipFlex>
        )}
        left={({ isMobile, responsiveSize }) => (
          <AnimatedTipFlex
            {...responsiveSize(3, showSetting)}
            flexDirection={isMobile ? 'row' : 'column'}
            justifyContent="space-around"
          >
            <div>SETTING</div>
          </AnimatedTipFlex>
        )}
      >
        {(props) => Childs(props)}
      </MainContainer>
    </FlexComponent>
  )
}
