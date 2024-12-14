import React from 'react';
import {View, Modal, StyleSheet, ActivityIndicator} from 'react-native';
import {colors, sizes} from '@/utils';
import {Text} from './typography/Text';

interface LoadingProps {
  loading?: boolean;
  isShort?: boolean;
}

export const LoadingActivityIndicator = ({
  loading = false,
  isShort = false,
}: LoadingProps) => {
  const LoadingContainerStyle = [
    styles.loadingContainer,
    isShort && styles.loadingShortContainer,
  ];
  const loadingTextStyle = [styles.text, isShort && styles.shortText];

  return (
    <Modal
      transparent
      animationType="fade"
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.container}>
        <View style={LoadingContainerStyle}>
          <ActivityIndicator color={colors.primary600} size="large" />
          <Text
            base="Subtitle2"
            weight="medium"
            align="center"
            style={loadingTextStyle}>
            読み込み中
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.blackOverlay,
    flex: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: sizes.radiusLg,
    // elavation: 5,
    gap: sizes.sizeTiny,
    height: 100,
    justifyContent: 'center',
    shadowColor: 'rgba(0, 177, 225, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    width: 100,
  },
  loadingShortContainer: {
    backgroundColor: colors.neutral800,
  },
  shortText: {
    color: colors.white,
  },
  text: {
    color: colors.dark90,
  },
});
