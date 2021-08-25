import * as React from "react";
import { useState } from "react";
import * as ReactDOM from "react-dom";
import { CircleSlider } from ".";

interface IState {
  value: number;
}
export default {
  title: "Components/CircleSlider",
  component: CircleSlider,
  argTypes: {},
};

export const Default: React.FC = () => {
  const [value, setValue] = useState(50);
  const handleChange = (value: any) => {
    setValue(value);
  };

  const handleChangeRange = (event: any) => {
    setValue(event.target.valueAsNumber);
  };

  return (
    <div className="outer">
      <CircleSlider
        value={value}
        size={120}
        knobRadius={15}
        progressWidth={20}
        circleWidth={3}
        onChange={handleChange}
        progressColor="#6656B6"
        tooltipColor="#6ab6e1"
        showTooltip={true}
        tooltipSize={26}
      />
      <div className="title">{value}</div>
      <div className="range">
        <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
      </div>
      <div className="code">
        {`<CircleSlider
    value={value}
    size={120}
    knobRadius={15}
    progressWidth={20}
    circleWidth={3}
    progressColor="#6656B6"
    tooltipColor="#6ab6e1"
    showTooltip={true}
    tooltipSize={26}
/>`}
      </div>
      <h3>Shadow</h3>
      <div className="slider">
        <CircleSlider
          value={value}
          size={500}
          shadow={false}
          knobColor="#ff5722"
          onChange={handleChange}
          showTooltip={true}
          showPercentage={true}
          progressColor="#FDB11B"
        />
        <div className="title">{value}</div>
        <div className="range">
          <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
        </div>
        <div className="code">
          {`<CircleSlider
    value={value}
    size={150}
    shadow={false}
    knobColor="#ff5722"
    showTooltip={true}
    showPercentage={true}
    progressColor="#FDB11B"
/>`}
        </div>
        <h3>Sizes</h3>
        <div className="wrapper">
          <div className="slider">
            <CircleSlider
              value={value}
              size={140}
              knobRadius={20}
              progressWidth={20}
              circleWidth={10}
              onChange={handleChange}
              progressColor="#5DC9A3"
            />
            <div className="title">{value}</div>
            <div className="range">
              <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
            </div>
          </div>
          <div className="code">
            {`<CircleSlider
    value={value}
    size={140}
    knobRadius={20}
    progressWidth={20}
    circleWidth={10}
    progressColor="#5DC9A3"
/>`}
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
              onChange={handleChange}
              progressColor="#6AB6E1"
            />
            <div className="title">{value}</div>
            <div className="range">
              <input min={0} max={100} id="control" type="range" value={value} onChange={handleChangeRange} />
            </div>
          </div>
          <div className="code">
            {`<CircleSlider
    value={value}
    size={140}
    knobRadius={15}
    progressWidth={10}
    circleWidth={25}
    progressColor="#6AB6E1"
/>`}
          </div>
        </div>
      </div>
    </div>
  );
};
