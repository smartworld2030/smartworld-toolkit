import React from 'react'
import { Box } from '../Box'
import Spinner from './Spinner'

export default {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {},
}

export const Default: React.FC = () => {
  return (
    <Box size={300}>
      <Spinner size={96} />
    </Box>
  )
}
