import React, { useEffect, useState } from 'react'
import { Box } from '../Box'
import { scales, variants } from '../Button/types'
import { Text } from '../Text'
import ProgressRing from './ProgressRing'

export default {
  title: 'Components/ProgressRing',
  component: ProgressRing,
  argTypes: {},
}

export const Default: () => JSX.Element[] = () => {
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    // emulating progress
    const interval = setInterval(() => {
      setProgress((prev) => prev + 10)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return Object.values(variants).map((variant) => (
    <Box key={variant} mb="32px">
      <Text key={variant}>{variant}</Text>
      {Object.values(scales).map((scale) => (
        <ProgressRing key={scale} scale={scale} progress={progress} variant={variant} loading />
      ))}
      <ProgressRing variant={variant} loading />
    </Box>
  ))
}

export const CustomSize: () => JSX.Element[] = () => {
  return Object.values(variants).map((variant, i) => (
    <ProgressRing
      image={[`https://picsum.photos/sa.png`, `https://picsum.photos/200/200?random=${i}`]}
      loading
      key={variant}
      variant={variant}
      size={100 + i * 10}
      onClick={() => console.log('Logo Clicked!')}
    />
  ))
}

export const CustomRadius: () => JSX.Element = () => {
  return <ProgressRing radius={100} circleColor="blue" loading />
}
