import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Appearance,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {Text} from '../typography/Text';
import {colors, sizes} from '@/utils';
import {Label} from './label';
import dayjs from 'dayjs';

interface DatePickerProps {
  placeholder?: string;
  title?: string;
  disabled?: boolean;
  error?: boolean;
  desc?: string;
  icon?: boolean;
  testID?: string;
  defaultDate?: Date;
  required?: boolean;
  mode?: 'date' | 'time' | 'datetime';
  onDateChanged?: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  minimumDate?: Date | undefined;
  maximumDate?: Date | undefined;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  title = '',
  disabled = false,
  error = false,
  desc = '',
  icon = false,
  required = false,
  defaultDate = new Date(),
  mode = 'datetime',
  minimumDate = undefined,
  maximumDate = undefined,
  onDateChanged = () => {},
  style,
}) => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkModePrefered = colorScheme === 'dark';

  const [showData, setShowDate] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const hideDatePicker = () => {
    setShowDate(false);
  };

  const handleConfirm = (date: Date) => {
    hideDatePicker();
    onDateChanged(date);
  };
  const showDatePicker = () => {
    setShowDate(true);
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };
  const fieldStyle = [
    styles.grayFieldContainer,
    disabled && styles.disabledInput,
    isPressed && {borderColor: colors.primary600},
    {
      paddingLeft: icon ? 40 : sizes.sizeXs2,
    },
  ];
  if (error) {
    fieldStyle.push({borderColor: colors.error600});
  }
  return (
    <View style={styles.container}>
      {title && <Label title={title} required={required} />}
      <TouchableOpacity
        style={[fieldStyle, style]}
        activeOpacity={0.6}
        onPress={showDatePicker}
        onPressOut={handlePressOut}>
        <Text base="Subtitle" style={styles.dateText}>
          {mode === 'date'
            ? defaultDate
              ? dayjs(defaultDate).format('YYYY-MM-DD')
              : '00-0000-00'
            : mode === 'time'
            ? defaultDate
              ? dayjs(defaultDate).format('HH:mm')
              : '00:00'
            : mode === 'datetime'
            ? defaultDate
              ? dayjs(defaultDate).format('YYYY-MM-DD HH:mm')
              : '0000-00-00 00:00'
            : null}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showData}
        mode={mode}
        date={defaultDate}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        textColor={isDarkModePrefered ? colors.white : colors.neutral800}
        isDarkModeEnabled={isDarkModePrefered}
        disabled={disabled}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
      {error && (
        <View style={styles.error}>
          <Text base="Subtitle2" weight="bold" style={styles.errorMessage}>
            {'Error!!!'}
          </Text>
        </View>
      )}
      {desc && (
        <Text base="Subtitle2" weight="bold" style={styles.desc}>
          {desc || ''}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: sizes.sizeTiny,
    marginBottom: sizes.sizeMd,
  },
  dateText: {
    color: colors.dark90,
  },
  desc: {
    color: colors.dark90,
  },
  disabledInput: {
    opacity: 0.4,
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
  grayFieldContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.neutral100,
    borderRadius: sizes.radiusMd,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    minWidth: 125,
    paddingHorizontal: 15,
    paddingRight: 45,
  },
  icon: {
    left: sizes.sizeXs, // Add some spacing from the right
    position: 'absolute',
    top: '55%',
    transform: [{translateY: -12}],
    zIndex: 1,
  },
  requiredText: {
    color: colors.error600,
  },
});
