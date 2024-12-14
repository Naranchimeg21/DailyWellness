import React, {useCallback, useEffect, useRef} from 'react';
import {View, StyleSheet, useWindowDimensions, Animated} from 'react-native';

import {useAppContext} from '../../context/providers/app.provider';
import {switchStack, setAppState} from '../../context/reducers/app.reducer';
import {ROOT_STACK} from '../../navigation/screenTypes';
import {colors, images, sizes} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import {gradientMapping} from '../../components';
import {getStorage, storageEnumKeys} from '@/utils/storage';

const SplashPage: React.FC = () => {
  const {width, height} = useWindowDimensions();
  const {appDispatch} = useAppContext();

  const onAnimationEnd = useCallback(async () => {
    const user = await getStorage(storageEnumKeys.USERW);
    if (!!user) {
      appDispatch(
        setAppState({
          user: JSON.parse(user),
          rootStack: ROOT_STACK.MAIN,
        }),
      );
    } else {
      appDispatch(switchStack(ROOT_STACK.AUTH));
    }
  }, []);

  const gradientStyle = [styles.gradient, {width: width, height: height}];
  const topRectangleAnim = useRef(new Animated.Value(-height)).current;
  const bottomRectangleAnim = useRef(new Animated.Value(height)).current;
  const leftRectangleAnim = useRef(new Animated.Value(-width)).current;
  const rightRectangleAnim = useRef(new Animated.Value(width * 1.5)).current;
  const contentWidth = useRef(new Animated.Value(60)).current;
  const logoTranslate = useRef(new Animated.Value(width * 0.1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(topRectangleAnim, {
      toValue: -height * 0.7,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(bottomRectangleAnim, {
      toValue: height * 0.65,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(leftRectangleAnim, {
      toValue: -width * 0.6,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(rightRectangleAnim, {
      toValue: width * 0.9,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.sequence([
      Animated.delay(1000), // Initial delay
      Animated.parallel([
        Animated.timing(contentWidth, {
          toValue: width * 0.82,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(logoTranslate, {
          toValue: 0, // Move logo to the left
          duration: 1000, // Duration of animation
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1, // Fade in the text
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => onAnimationEnd());
  }, [
    onAnimationEnd,
    bottomRectangleAnim,
    topRectangleAnim,
    rightRectangleAnim,
    leftRectangleAnim,
    contentWidth,
    logoTranslate,
    textOpacity,
    width,
    height,
  ]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientMapping['gradient-2']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={gradientStyle}
      />
      {/* Rectangles */}
      <Animated.Image
        source={require('@/assets/sr-y.png')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: width * 0.7,
          height: height * 1.6,
          backgroundColor: 'rgba(255,255,255,0)',
          transform: [
            {translateY: topRectangleAnim},
            {translateX: width * 0.1},
            {rotate: '75deg'},
          ],
        }}
      />
      <Animated.Image
        source={require('@/assets/sr-y.png')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: width * 0.7,
          height: height * 1.6,
          backgroundColor: 'rgba(255,255,255,0)',
          transform: [
            {translateY: bottomRectangleAnim},
            {translateX: width * 0.1},
            {rotate: '-104deg'},
          ],
        }}
      />
      <Animated.Image
        source={require('@/assets/sr-x.png')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: width * 0.7,
          height: height * 1.6,
          backgroundColor: 'rgba(255,255,255,0)',
          transform: [
            {translateY: height * 0.25},
            {translateX: leftRectangleAnim},
            {rotate: '-25deg'},
          ],
        }}
      />
      <Animated.Image
        source={require('@/assets/sr-x.png')}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: width * 0.7,
          height: height * 1.6,
          backgroundColor: 'rgba(255,255,255,0)',
          transform: [
            {translateY: height * 0.25},
            {translateX: rightRectangleAnim},
            {rotate: '-205deg'},
          ],
        }}
      />
      {/* Content */}
      <Animated.View
        style={[
          styles.content,
          {
            width: contentWidth,
          },
        ]}>
        <Animated.Image
          style={[
            styles.logo,
            {
              transform: [{translateX: logoTranslate}], // Bind horizontal movement to animation
            },
          ]}
          resizeMode="cover"
          source={images.logo as never} // Replace with your logo path
        />
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: textOpacity, // Bind opacity to animation
              },
            ]}>
            Daily Wellness
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    flex: 1,
    top: 1,
    left: 1,
  },
  container: {
    backgroundColor: colors.primary500,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.sizeSm,
    maxHeight: 60,
    overflow: 'visible',
    paddingHorizontal: sizes.sizeMd,
  },
  logo: {
    zIndex: 10,
    height: 60,
    width: 60,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    zIndex: 9,
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 38,
    color: colors.white,
  },
});

export default SplashPage;
