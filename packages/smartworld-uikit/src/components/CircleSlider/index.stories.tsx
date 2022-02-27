import * as React from 'react'
import { useState } from 'react'
import { CircleSlider } from '.'

export default {
  title: 'Components/CircleSlider',
  component: CircleSlider,
  argTypes: {},
}

export const Default: React.FC = () => {
  const [value, setValue] = useState(50)
  const [timer, setTimer] = useState(90)

  React.useEffect(() => {
    const interval = setInterval(() => {
      return setTimer((prev) => {
        if (prev > 99) return 0
        return prev + 1
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleChange = (v: number) => {
    setValue(v)
  }

  const handleChangeRange = (event) => {
    setValue(event.target.valueAsNumber)
  }

  return (
    <div className="outer">
      <CircleSlider
        value={value}
        size={120}
        knobRadius={15}
        progressWidth={20}
        circleWidth={3}
        onInputChange={handleChange}
        progressColor="#6656B6"
        tooltipColor="#6ab6e1"
        tooltipSize={26}
      />
      <div className="title">{value}</div>
      <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
      <h3>Shadow</h3>
      <div className="slider">
        <CircleSlider
          value={timer}
          size={500}
          shadow={false}
          knobColor="transparent"
          noSlider
          onInputChange={handleChange}
          showPercentage
          progressColor="#FDB11B"
        />
        <div className="title">{value}</div>
        <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
        <h3>Sizes</h3>
        <div className="wrapper">
          <div className="slider">
            <CircleSlider
              value={value}
              size={140}
              knobRadius={20}
              progressWidth={20}
              circleWidth={10}
              onInputChange={handleChange}
              progressColor="#5DC9A3"
            />
            <div className="title">{value}</div>
            <div className="range">
              <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
            </div>
          </div>
        </div>
        <h3>Exact sizes</h3>
        <div className="wrapper">
          <div className="slider">
            <CircleSlider
              value={value}
              size={140}
              knobRadius={15}
              progressWidth={10}
              circleWidth={25}
              onInputChange={handleChange}
              progressColor="#6AB6E1"
            />
            <div className="title">{value}</div>
            <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
          </div>
        </div>
      </div>
    </div>
  )
}
