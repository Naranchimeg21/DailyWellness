import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import {colors, sizes} from '../utils';

// import Icon from 'react-native-vector-icons/Ionicons';
import {BaseType, Text, WeightType} from './typography/Text';

declare const ButtonTypes: readonly ['contained', 'outlined', 'text', 'icon'];

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  type?: (typeof ButtonTypes)[number];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
  weight?: WeightType;
  base?: BaseType;
  size?: 'large' | 'middle' | 'small';
}
export const Button = ({
  title = '',
  onPress = () => {},
  buttonStyle,
  textStyle,
  leftIcon,
  rightIcon,
  disabled = false,
  type = 'contained',
  weight = 'medium',
  base = 'Subtitle2',
  size = 'large',
}: ButtonProps) => {
  const ButtonStyles: StyleProp<ViewStyle> = [
    styles.defaultButton,
    type === 'outlined' && styles.borderButton,
    type === 'text' && styles.textButton,
    buttonStyle,
    disabled && styles.disabledButton,
    size === 'large' && styles.heightLg,
    size === 'middle' && styles.heightMd,
    size === 'small' && styles.heightSm,
  ];

  const TextStyles = [
    styles.defaultText,
    type === 'outlined' && styles.borderText,
    type === 'text' && styles.Text,
    textStyle,
    size === 'large' && styles.largeButtonText,
  ];

  return (
    <TouchableOpacity
      style={ButtonStyles}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}>
      {leftIcon && <View style={styles.marginIcon}>{leftIcon}</View>}
      {type !== 'icon' && (
        <Text
          weight={weight}
          align="center"
          base={base}
          style={TextStyles}
          numberOfLines={1}>
          {title}
        </Text>
      )}
      {rightIcon && <View style={styles.marginIcon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  heightLg: {
    height: sizes.heightLg,
  },
  heightMd: {
    height: sizes.height,
  },
  heightSm: {
    height: sizes.heightSm,
  },
  Text: {
    color: colors.dark90,
  },
  borderButton: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    color: colors.primary,
    borderWidth: 1,
  },
  borderText: {
    color: colors.primary,
  },
  defaultButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: sizes.radiusMd,
    flexDirection: 'row',
    gap: sizes.sizeXxs,
    justifyContent: 'center',
    paddingHorizontal: sizes.radiusSm,
    paddingVertical: sizes.sizeXxs,
  },
  defaultText: {
    color: colors.white,
  },
  disabledButton: {
    backgroundColor: colors.strokeDark,
  },
  marginIcon: {
    margin: 0,
  },
  textButton: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: sizes.sizeSm,
  },
  largeButtonText: {
    fontWeight: '600',
  },
});
