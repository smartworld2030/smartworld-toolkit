import React, { ReactNode } from 'react'
import Flex from '../../../components/Box/Flex'
import { Text } from '../../../components/Text'

interface Props {
  innerLogo: ReactNode
  title?: string
}

const Logo: React.FC<Props> = ({ innerLogo, title }) => {
  return (
    <Flex>
      <Flex>
        {innerLogo && innerLogo}
        <Text fontWeight="bold" ml="5px">
          {title}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Logo
