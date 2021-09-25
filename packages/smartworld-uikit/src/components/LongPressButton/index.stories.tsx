import React from 'react'
import Box from '../Box/Box'
import { LogoIcon } from '../Svg'
import { LongPressButton } from './'

export default {
  title: 'Components/LongPressButton',
  component: LongPressButton,
  argTypes: {},
}

export const Default: React.FC = () => {
  const onClick = () => console.log('clicked')
  return (
    <>
      <Box mb="32px">
        <LongPressButton successIcon={<LogoIcon />} transition={6000} size={100} onClick={onClick} mr="8px">
          LongPressButton
        </LongPressButton>
      </Box>
      <Box>
        <LongPressButton onClick={onClick} variant="secondary" disabled>
          Disabled
        </LongPressButton>
      </Box>
    </>
  )
}
