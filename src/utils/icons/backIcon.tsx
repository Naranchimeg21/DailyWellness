import React from 'react';
import Svg, {Path} from 'react-native-svg';

const BackIcon = ({
  color = 'currentColor',
  size = 32,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67"
      />
    </Svg>
  );
};

export default BackIcon;
