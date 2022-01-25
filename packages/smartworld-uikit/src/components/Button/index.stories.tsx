import { capitalize } from 'lodash'
import React, { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import Box from '../Box/Box'
import Text from '../Text/Text'
import Flex from '../Box/Flex'
import { AddIcon, AutoRenewIcon, LogoIcon } from '../Svg'
import { DetailedButton } from './DetailedButton'
import { ButtonWithSlider } from './ButtonWithSlider'
import IconButton from './IconButton'
import Button from './Button'
import { PayButton } from './PayButton'
import PolygonButton from './PolygonButton'
import { ExpandableButton, ExpandableLabel } from './ExpandableButton'
import { scales, variants } from './types'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

const Row = styled(Flex)`
  margin-bottom: 32px;
  & > button + button,
  & > a + a {
    margin-left: 16px;
  }
`

export const Default: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box>
        <Button mr="8px" disabled>
          Disabled
        </Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </Box>
    </>
  )
}

export const Circle: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        <button type="button">Unstyled Button</button>
      </Box>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button shape="circle" key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box mb="32px">
        {Object.values(scales).map((scale) => {
          return (
            <Button shape="circle" disabled key={scale} scale={scale} mr="8px">
              {`Disabled ${scale.toUpperCase()}`}
            </Button>
          )
        })}
      </Box>
      <Box>
        <Button shape="circle" scale="ml" mr="8px" disabled>
          Disabled
        </Button>
        <Button shape="circle" scale="ml" variant="secondary" disabled>
          Disabled
        </Button>
      </Box>
    </>
  )
}

export const Anchors: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button
                    as="a"
                    href="https://smartworld.app"
                    key={scale}
                    variant={variant}
                    scale={scale}
                    external
                    mr="8px"
                  >
                    {`${capitalize(variant)} anchor ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
      <Box>
        <Button as="a" href="https://smartworld.app" mr="8px" external disabled>
          Disabled
        </Button>
        <Button as="a" href="https://smartworld.app" variant="secondary" external disabled>
          Disabled
        </Button>
      </Box>
    </>
  )
}

export const Variants: React.FC = () => {
  return (
    <Box width="640px">
      <BrowserRouter>
        <Row>
          <Button as={Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button>
        </Row>
        <Row>
          <Button width="100%">Full size</Button>
        </Row>
        <Row>
          <Button isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            Approving
          </Button>
          <Button isLoading variant="success">
            Approving
          </Button>
        </Row>
        <Row>
          <Button startIcon={<LogoIcon />}>Start Icon</Button>
          <Button endIcon={<LogoIcon />}>End Icon</Button>
          <Button startIcon={<LogoIcon />} endIcon={<LogoIcon />}>
            Start & End Icon
          </Button>
        </Row>
        <Row>
          <IconButton>
            <LogoIcon />
          </IconButton>
          <IconButton variant="secondary">
            <AddIcon />
          </IconButton>
        </Row>
        <Row>
          <IconButton scale="sm" variant="danger">
            <LogoIcon />
          </IconButton>
          <IconButton scale="sm" variant="success">
            <AddIcon color="currentColor" />
          </IconButton>
        </Row>
      </BrowserRouter>
    </Box>
  )
}

export const CircleVariants: React.FC = () => {
  return (
    <Box width="640px">
      <BrowserRouter>
        <Row>
          <Button shape="circle" as={Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button>
        </Row>
        <Row>
          <Button shape="circle" isLoading endIcon={<AutoRenewIcon spin color="currentColor" />}>
            Approving
          </Button>
          <Button shape="circle" isLoading variant="success">
            Approving
          </Button>
        </Row>
        <Row>
          <Button shape="circle" startIcon={<LogoIcon />}>
            Start Icon
          </Button>
          <Button shape="circle" endIcon={<LogoIcon />}>
            End Icon
          </Button>
          <Button shape="circle" startIcon={<LogoIcon />} endIcon={<LogoIcon />} variant="transparent">
            Start & End Icon
          </Button>
        </Row>
        <Row>
          <IconButton scale="lg" iconProps={{ color: 'red', left: 0, top: 0 }} icon={(w) => <LogoIcon width={w} />}>
            STTS
          </IconButton>
          <IconButton shape="circle" variant="secondary">
            <AddIcon />
          </IconButton>
        </Row>
        <Row>
          <IconButton shape="circle" scale="sm" variant="danger">
            <LogoIcon />
          </IconButton>
          <IconButton shape="circle" scale="sm" variant="success">
            <AddIcon color="currentColor" />
          </IconButton>
        </Row>
        <Row>
          <DetailedButton topIcon="token" shape="circle" bottomIcon="STTS">
            <LogoIcon width="15" />
          </DetailedButton>
          <DetailedButton topIcon="token" scale="lg" shape="circle" bottomIcon="100" variant="secondary">
            STTS
          </DetailedButton>
          <DetailedButton topIcon="token" scale="lg" shape="circle" bottomIcon="100">
            STTS
          </DetailedButton>
        </Row>
        <Row>
          <DetailedButton shape="circle" scale="lg" variant="secondary">
            <LogoIcon />
          </DetailedButton>
          <DetailedButton shape="circle" scale="ml" variant="danger">
            <LogoIcon />
          </DetailedButton>
          <DetailedButton variant="subtle" shape="circle" scale="xl" topIcon="Token" bottomIcon={100}>
            <AddIcon width="40" />
          </DetailedButton>
          <DetailedButton
            shape="circle"
            width="300"
            scale="xl"
            topIcon={<Text>Token</Text>}
            bottomIcon={<Text>100</Text>}
          >
            <AddIcon width="40" />
          </DetailedButton>
        </Row>
      </BrowserRouter>
    </Box>
  )
}

export const Expandable: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Box mb="32px">
      {Object.values(scales).map((scale) => (
        <Row key={scale}>
          <ExpandableButton expanded={expanded} scale={scale} onClick={() => setExpanded((prev) => !prev)} />
        </Row>
      ))}
      <Row>
        <ExpandableLabel expanded={expanded} onClick={() => setExpanded((prev) => !prev)}>
          ExpandableLabel
        </ExpandableLabel>
      </Row>
    </Box>
  )
}

export const PayButtonExample: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const onClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setDone(true)
      setTimeout(() => {
        setDone(false)
      }, 5000)
    }, 5000)
  }
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <div key={variant}>
              <h1>{variant}</h1>
              <Box mb="32px">
                {Object.values(scales).map((scale) => {
                  return (
                    <PayButton
                      key={scale}
                      variant={variant}
                      scale={scale}
                      shadow
                      external
                      mb="8px"
                      done={done}
                      isLoading={loading}
                      onClick={onClick}
                    />
                  )
                })}
              </Box>
            </div>
          )
        })}
      </Box>
      Disabled
      <Box mb="32px">
        {Object.values(scales).map((scale) => {
          return (
            <PayButton
              key={scale}
              scale={scale}
              shadow
              external
              disabled
              mb="8px"
              done={done}
              isLoading={loading}
              onClick={onClick}
            />
          )
        })}
      </Box>
    </>
  )
}

export const IconButtonExample: React.FC = () => {
  return (
    <Box mb="32px">
      {Object.values(scales).map((scale) => {
        return (
          <IconButton
            key={scale}
            scale={scale}
            color="white"
            mr="8px"
            icon={(size) => <LogoIcon width={size} />}
            onClick={() => console.log('clicked')}
          >
            STTS
          </IconButton>
        )
      })}
      {Object.values(scales).map((scale) => {
        return (
          <IconButton
            key={scale}
            scale={scale}
            color="white"
            mr="8px"
            shadow
            bottomIcon={() => '1220'}
            icon={(size) => <LogoIcon width={size} />}
            onClick={() => console.log('clicked')}
          >
            STTS
          </IconButton>
        )
      })}
    </Box>
  )
}

export const PolygonButtonExample: React.FC = () => {
  return (
    <Box mb="32px">
      {Object.values(scales).map((scale) => {
        return (
          <PolygonButton
            key={scale}
            scale={scale}
            color="white"
            shadow
            mr="8px"
            icon={(size) => <LogoIcon width={size / 3} />}
            onClick={() => console.log('clicked')}
          />
        )
      })}
    </Box>
  )
}

export const ButtonWithSliderExample: React.FC = () => {
  const [click, setClick] = useState('')
  const [value, seValue] = useState(100)
  return (
    <Box mb="32px">
      {Object.values(scales).map((scale) => {
        return (
          <ButtonWithSlider
            key={scale}
            scale={scale}
            color="white"
            mr="8px"
            onInput={seValue}
            value={value}
            shadow
            onClick={() => {
              setClick('click')
              setTimeout(() => {
                setClick('')
              }, 1000)
            }}
          >
            {click}
          </ButtonWithSlider>
        )
      })}
      {Object.values(scales).map((scale) => {
        return (
          <ButtonWithSlider
            key={scale}
            scale={scale}
            color="white"
            mr="8px"
            disabled
            onInput={seValue}
            value={value}
            shadow
            onClick={() => {
              setClick('click')
              setTimeout(() => {
                setClick('')
              }, 1000)
            }}
          >
            {click}
          </ButtonWithSlider>
        )
      })}
    </Box>
  )
}
