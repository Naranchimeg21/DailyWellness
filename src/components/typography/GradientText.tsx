import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import {Text} from './Text';
import {StyleProp, StyleSheet, TextStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors, sizes} from '@/utils';

export type GradientTextType = 'gradient-none' | 'gradient-1' | 'gradient-2';
type GradientTextDirection = 'to-right' | 'to-left' | 'to-bottom' | 'to-top';

type GradientTextProps = {
  children: React.ReactNode;
  direction?: GradientTextDirection;
  gradient?: GradientTextType;
  style?: StyleProp<TextStyle>;
  height?: number;
  width?: number;
};
export const gradientMapping: Record<
  GradientTextType,
  [string, string, ...string[]]
> = {
  'gradient-none': [colors.dark, colors.dark],
  'gradient-1': [colors.primary, colors.primary],
  'gradient-2': [colors.primary, colors.primary700],
};
const directionMapping: Record<
  GradientTextDirection,
  {start: {x: number; y: number}; end: {x: number; y: number}}
> = {
  'to-right': {start: {x: 0, y: 0.5}, end: {x: 1, y: 0.5}},
  'to-left': {start: {x: 1, y: 0.5}, end: {x: 0, y: 0.5}},
  'to-bottom': {start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}},
  'to-top': {start: {x: 0.5, y: 1}, end: {x: 0.5, y: 0}},
};

export default function GradientText({
  children,
  direction = 'to-right',
  gradient = 'gradient-2',
  style,
}: GradientTextProps) {
  const {start, end} = directionMapping[direction];
  return (
    <MaskedView
      style={styles.container}
      maskElement={<Text style={[styles.text, style]}>{children}</Text>}>
      <LinearGradient
        colors={gradientMapping[gradient]}
        start={start}
        end={end}
        style={{...styles.gradient}}
      />
    </MaskedView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: sizes.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
});
