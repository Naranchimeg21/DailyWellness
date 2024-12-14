import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DeleteIcon = ({
  color = 'currentColor',
  size = 32,
}: {
  color?: string;
  size?: number;
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.81 2 5.19 5.63M15.19 2l3.62 3.63"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"></Path>
      <Path
        d="M2 7.85c0-1.85.99-2 2.22-2h15.56c1.23 0 2.22.15 2.22 2 0 2.15-.99 2-2.22 2H4.22C2.99 9.85 2 10 2 7.85Z"
        stroke={color}
        strokeWidth="1.5"></Path>
      <Path
        d="M9.76 14v3.55M14.36 14v3.55M3.5 10l1.41 8.64C5.23 20.58 6 22 8.86 22h6.03c3.11 0 3.57-1.36 3.93-3.24L20.5 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"></Path>
    </Svg>
  );
};

export default DeleteIcon;
