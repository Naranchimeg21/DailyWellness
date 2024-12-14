import React from 'react';
import {Text as RNText, StyleProp, TextStyle, TextProps} from 'react-native';

export type BaseType =
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'H6'
  | 'H7'
  | 'Subtitle'
  | 'Subtitle2'
  | 'Body'
  | 'Caption'
  | 'Small';

export type WeightType = 'bold' | 'medium' | 'regular';

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;

interface Props extends TextProps {
  base?: BaseType;
  weight?: WeightType;
  align?: TextAlign;
}

export const Text = ({
  children,
  base = 'Body',
  weight = 'regular',
  align = 'left',
  style,
  ...props
}: Props) => {
  const fontSizeMapping: Record<BaseType, [number, number]> = {
    H1: [80, 120],
    H2: [60, 90],
    H3: [40, 60],
    H4: [28, 38],
    H5: [24, 36],
    H6: [20, 30],
    H7: [18, 28],
    Subtitle: [18, 26],
    Subtitle2: [16, 24],
    Body: [14, 22],
    Caption: [12, 18],
    Small: [10, 14],
  };

  let fontWeight: TextStyle['fontWeight'] = '400';
  if (weight === 'bold') {
    fontWeight = '700';
  } else if (weight === 'medium') {
    fontWeight = '500';
  }

  // Get fontSize and lineHeight from mapping
  const [fontSize, lineHeight] = fontSizeMapping[base];

  // Combine styles
  const textStyles: StyleProp<TextStyle> = {
    fontSize: fontSize,
    lineHeight: lineHeight,
    fontWeight: fontWeight,
  };

  return (
    <RNText {...props} style={[textStyles, {textAlign: align}, [style]]}>
      {children}
    </RNText>
  );
};
