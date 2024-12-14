import React from 'react';
import {Modal, View, Image, StyleSheet} from 'react-native';
import {colors, images, sizes} from '../utils';
import {Button} from './button';
import {Text} from './typography/Text';

type StateTypes = 'success' | 'warning' | 'error';

interface AlertModalProps {
  state?: StateTypes;
  desc?: string;
  secondButton?: boolean;
  visible: boolean;
  onClose?: () => void;
  cancelPress?: () => void;
  onPress?: () => void;
  close?: boolean;
  title?: string;
  btnText?: string;
  secondBtnText?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}

export const AlertModal = ({
  state = 'success',
  onClose,
  cancelPress,
  onPress,
  desc,
  secondButton,
  visible,
  close,
  title = 'title',
  btnText = 'OK',
  secondBtnText = 'Second',
  justifyContent = 'center',
}: AlertModalProps) => {
  const getImagePicker = (() => {
    switch (state) {
      case 'warning':
        return images.alertModalWarning;
      case 'error':
        return images.alertModalError;
      default:
        return images.alertModalSuccess;
    }
  })();

  const modalStyle = [
    styles.modalContainer,
    {justifyContent: justifyContent},
    justifyContent === 'flex-end' && styles.paddingNull,
  ];

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyle}>
        <View style={styles.modalContent}>
          <View>
            <Image source={getImagePicker as never} style={styles.image} />
            <Text base="H4" weight="bold" align="center">
              {title}
            </Text>
            {desc && (
              <Text base="H6" style={styles.desc} align="center">
                {desc}
              </Text>
            )}
          </View>
          {close && (
            <Button
              type="icon"
              leftIcon="close-outline"
              buttonStyle={styles.closeBtn}
              iconColor={colors.neutral800}
              onPress={onClose}
            />
          )}
          {secondButton && (
            <View style={styles.buttonStandardParent}>
              <Button
                title={secondBtnText}
                base="H6"
                buttonStyle={styles.buttonFlexBox}
                type="outlined"
                onPress={cancelPress}
              />
              <Button
                title={btnText}
                onPress={onPress}
                buttonStyle={styles.buttonStandard3}
                base="H6"
                weight="bold"
              />
            </View>
          )}
          {!secondButton && (
            <Button title={btnText} base="H6" weight="bold" onPress={onClose} />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonFlexBox: {
    flex: 1,
    // whiteSpace: 'nowrap',
  },
  buttonStandard3: {
    flex: 1,
  },
  buttonStandardParent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: sizes.sizeSm,
  },
  closeBtn: {
    backgroundColor: colors.neutral100,
    borderRadius: sizes.radiusMd,
    height: 46,
    paddingHorizontal: 0,
    paddingVertical: 0,
    position: 'absolute',
    right: 15,
    top: 15,
    width: 46,
  },
  desc: {
    color: colors.dark90,
    marginTop: sizes.sizeXs2,
  },
  image: {
    alignSelf: 'center',
    height: 200,
    width: 250,
  },
  modalContainer: {
    backgroundColor: colors.blackOverlay,
    flex: 1,
    justifyContent: 'center',
    padding: sizes.sizeMd,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: sizes.sizeMd,
    // elavation: 5,
    gap: sizes.sizeLg,
    paddingBottom: sizes.sizeMd,
    paddingHorizontal: sizes.sizeMd,
    shadowColor: 'rgba(0, 177, 225, 0.1)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  paddingNull: {
    padding: sizes.sizeDefault,
  },
});
