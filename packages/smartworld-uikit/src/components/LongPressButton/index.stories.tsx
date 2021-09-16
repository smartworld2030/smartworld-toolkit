import { capitalize } from 'lodash'
import React from 'react'
import styled from 'styled-components'
import Box from '../Box/Box'
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
        <LongPressButton transition={3000} size={100} onClick={onClick} mr="8px">
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
