import React from "react";
import Svg from "../Svg/Svg";
import { SvgProps } from "../Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 100 100" {...props}>
      <circle strokeWidth="4" r="47" cx="50" cy="50" fill="transparent" strokeDasharray={290} />
    </Svg>
  );
};

export default Icon;
