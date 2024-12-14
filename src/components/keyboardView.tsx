import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {colors} from '@/utils';

interface Props {
  children?: ReactNode;
  offset?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export const KeyboardView = ({
  children,
  offset = 94,
  containerStyle,
}: Props) => {
  const ContainerStyle = [styles.container, containerStyle];

  return Platform.OS === 'android' ? (
    <KeyboardAvoidingView
      style={ContainerStyle}
      contentContainerStyle={styles.flexGrow1}
      enabled>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAvoidingView
      style={ContainerStyle}
      behavior={'padding'}
      keyboardVerticalOffset={offset}
      contentContainerStyle={styles.flexGrow1}
      enabled>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
});
