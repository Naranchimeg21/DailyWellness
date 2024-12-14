import React, {ReactNode, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {colors, sizes} from '../../utils';

interface Props {
  testID?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  keyboardType?: any;
  defaultValue?: string;
  disabled?: boolean;
  errorText?: string;
  style?: any;
  containerStyle?: any;
  textArea?: boolean;
  required?: boolean;
  formLabel?: string;
  flexValue?: number;
  onBlur?: () => void;
  value?: string | undefined | null;
  onChangeText?: (value: string) => void;
  maxLength?: any;
  icon?: ReactNode;
  autoFocus?: boolean;
}

const InputForm = ({
  testID = '',
  placeholder = '',
  placeholderTextColor = colors.dark,
  keyboardType = 'default',
  defaultValue = '',
  disabled = true,
  errorText = '',
  style = {},
  containerStyle = {},
  textArea = false,
  icon,
  required = false,
  formLabel = '',
  flexValue = 1,
  onBlur = () => {},
  value = '',
  onChangeText = () => {},
  maxLength = null,
  autoFocus = false,
}: Props) => {
  const [focused, setFocused] = useState(false);

  const fieldStyle = [
    styles.grayFieldContainer,
    !disabled && styles.disabledInput,
  ];

  return (
    <View style={containerStyle}>
      {formLabel && (
        <Text style={styles.titleText}>
          {formLabel} {required && <Text style={styles.requiredText}>*</Text>}
        </Text>
      )}
      <View style={[fieldStyle, focused && styles.focusedField, style]}>
        {icon && <View style={styles.marginIcon}>{icon}</View>}
        <TextInput
          testID={testID}
          placeholder={placeholder}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          autoCapitalize="none"
          value={value ? value : ''}
          onChangeText={onChangeText}
          onBlur={() => {
            onBlur();
            setFocused(false);
          }}
          onFocus={() => setFocused(true)}
          editable={disabled}
          multiline={textArea}
          maxLength={maxLength}
          placeholderTextColor={placeholderTextColor}
          autoFocus={autoFocus}
          style={[styles.fieldContainer, {flex: flexValue}]}
        />
      </View>
      {errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  disabledInput: {
    opacity: 0.4,
  },
  errorContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  errorText: {
    color: colors.error600,
    fontSize: sizes.body1,
  },
  fieldContainer: {
    backgroundColor: colors.transparent,
    borderColor: colors.transparent,
    color: colors.dark,
    fontSize: sizes.body2,
    height: 42,
    minWidth: 48,
  },
  grayFieldContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderRadius: sizes.radiusSm,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 15,
  },
  focusedField: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  marginIcon: {
    marginRight: 10,
  },
  requiredText: {
    color: colors.error600,
  },
  titleText: {
    color: colors.dark,
    fontSize: sizes.body1,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default InputForm;
