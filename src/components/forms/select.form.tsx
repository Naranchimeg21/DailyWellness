import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import RNPickerSelect, {PickerSelectProps} from 'react-native-picker-select';
import {Text} from '../typography/Text';
import {colors, sizes} from '@/utils';
import {Label} from './label';

interface DropdownProps extends PickerSelectProps {
  title?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  desc?: string;
  placeholder?: string;
  icon?: boolean;
  required?: boolean;
}

export const SelectInput = ({
  title = '',
  disabled = false,
  error = false,
  errorText = '',
  desc = '',
  placeholder = '選択...',
  icon = false,
  required = false,
  ...props
}: DropdownProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const fieldStyle = [
    styles.fieldContainer,
    disabled && styles.fieldDisabled,
    error && styles.fieldError,
    isFocused && styles.fieldFocused,
  ];

  return (
    <View style={styles.container}>
      {title && <Label title={title} required={required} />}
      <View style={fieldStyle}>
        <RNPickerSelect
          {...props}
          placeholder={{
            label: placeholder,
            value: null,
          }}
          style={{
            inputAndroid: styles.inputAndroid,
            iconContainer: styles.iconContainer,
            inputIOS: styles.inputIOS,
            placeholder: styles.placeholder,
          }}
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          useNativeAndroidPickerStyle={false}
          // Icon={() => (
          // )}
        />
      </View>
      {error && (
        <View style={styles.error}>
          <Text base="Subtitle2" weight="bold" style={styles.errorMessage}>
            {errorText}
          </Text>
        </View>
      )}
      {desc && desc.trim() !== '' && (
        <Text base="Subtitle2" weight="bold">
          {desc}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: sizes.sizeTiny,
    marginBottom: sizes.sizeMd,
  },
  error: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: sizes.radiusMd,
    justifyContent: 'flex-start',
  },
  errorMessage: {
    color: colors.error600,
  },
  fieldContainer: {
    backgroundColor: colors.white,
    borderColor: colors.strokeDark,
    borderRadius: sizes.radiusMd,
    borderWidth: 1,
    height: 48,
    minWidth: 125,
    paddingHorizontal: 15,
  },
  fieldDisabled: {
    backgroundColor: colors.neutral100,
    opacity: 0.6,
  },
  fieldError: {
    borderColor: colors.error600,
  },
  fieldFocused: {
    borderColor: colors.primary600,
  },
  icon: {
    left: sizes.sizeXs,
    position: 'absolute',
    top: '55%',
    transform: [{translateY: -12}],
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: colors.white,
    top: 14,
  },
  inputAndroid: {
    color: colors.dark,
    fontSize: sizes.body1,
    height: 46,
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    width: '100%',
  },
  inputIOS: {
    color: colors.dark,
    fontSize: sizes.body1,
    height: 46,
    paddingBottom: 5,
    paddingHorizontal: 0,
    paddingTop: 5,
  },
  placeholder: {
    color: colors.neutral400,
  },
});
