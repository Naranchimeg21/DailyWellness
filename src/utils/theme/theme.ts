const colors = {
  // main

  // Primary
  primary5: '#3085FE0D',
  primary10: '#3085FE1A',
  primary20: '#3085FE33',
  primary50: '#3085FE80',
  primary80: '#3085FECC',
  primary90: '#3085FEE5',
  primary100: '#D1E2F9',
  primary200: '#B0C7E8',
  primary300: '#7FA7DF',
  primary400: '#588FDE',
  primary500: '#3085FE',
  primary600: '#2F77DE',
  primary700: '#2364C0',
  primary800: '#1B4A8C',
  primary900: '#0D3671',
  primary: '#3085FE',

  // Secondary
  secondary5: '#A3D1390D',
  secondary10: '#A3D1391A',
  secondary20: '#A3D13933',
  secondary80: '#A3D139CC',
  secondary90: '#A3D139E5',
  secondary100: '#E1F1BC',
  secondary200: '#CEE993',
  secondary300: '#BCDE6B',
  secondary400: '#AFD751',
  secondary500: '#A3D139',
  secondary600: '#97BD33',
  secondary700: '#88A52A',
  secondary800: '#798D21',
  secondary900: '#626615',
  secondary: '#A3D139',

  // Tertiary
  tertiary5: '#FF7F740D',
  tertiary10: '#FF7F741A',
  tertiary20: '#FF7F7433',
  tertiary80: '#FF7F74CC',
  tertiary90: '#FF7F74E5',
  tertiary100: '#FFE3E0',
  tertiary200: '#F3C5C1',
  tertiary300: '#F3B0AA',
  tertiary400: '#F6928A',
  tertiary500: '#FF7F74',
  tertiary600: '#ED5D51',
  tertiary700: '#E54C3F',
  tertiary800: '#CB3629',
  tertiary900: '#972117',
  tertiary: '#FF7F74',

  // Dark
  dark5: '#1013170D',
  dark10: '#1013171A',
  dark20: '#10131733',
  dark50: '#10131780',
  dark80: '#101317CC',
  dark90: '#101317E5',
  dark: '#101317',

  // Gray
  gray5: '#ACAFB50D',
  gray10: '#ACAFB51A',
  gray20: '#ACAFB533',
  gray50: '#ACAFB580',
  gray80: '#ACAFB5CC',
  gray90: '#ACAFB5E5',
  gray: '#ACAFB5',

  // Light
  light5: '#D9E1E10D',
  light10: '#D9E1E11A',
  light20: '#D9E1E133',
  light50: '#D9E1E180',
  light80: '#D9E1E1CC',
  light90: '#D9E1E1E5',
  light: '#D9E1E1',

  // White
  white5: '#FFFFFF0D',
  white10: '#FFFFFF1A',
  white20: '#FFFFFF33',
  white50: '#FFFFFF80',
  white80: '#FFFFFFCC',
  white90: '##FFFFFFE5',
  white: '#FFFFFF',

  //text

  titleColor: '#5E596E',
  bodyTextColor: '#928E9C',
  darkTextColor: '#242229',

  // child
  // Neutral
  neutral900: '#111827',
  neutral800: '#1f2937',
  neutral700: '#374151',
  neutral600: '#4B5563',
  neutral500: '#6B7280',
  neutral400: '#9CA3AF',
  neutral300: '#F9FAFB',
  neutral200: '#E5E7EB',
  neutral100: '#F1F2F6',
  neutral50: '#F9FAFB',
  //Success
  success100: '#E9F9EF',
  success300: '#7ADC9E',
  success400: '#60D58B',
  success500: '#3DCC71',
  success600: '#22C55E',
  success700: '#1EAD53',
  success800: '#188E44',
  success900: '#147638',

  //Warning
  warning100: '#FEF5E7',
  warning300: '#F9C56D',
  warning400: '#F8B94F',
  warning500: '#F6AA28',
  warning600: '#F59E0B',
  warning700: '#D88B0A',
  warning800: '#B07208',
  warning900: '#935F07',

  //Error
  error100: '#FFEDED',
  error300: '#FF9292',
  error400: '#FF7C7C',
  error500: '#FF5F5F',
  error600: '#FF4949',
  error700: '#E04040',
  error800: '#B83535',
  error900: '#992C2C',

  //Info
  info100: '#E5EEFF',
  info300: '#669AFF',
  info400: '#4786FF',
  info500: '#1F6BFF',
  info600: '#0057FF',
  info700: '#004DE0',
  info800: '#003FB8',
  info900: '#003499',

  // Stroke
  strokeDark: '#dedede',
  strokeSecondary: '#F1F2F6',

  // Opacity
  blackOverlay: 'rgba(31, 41, 55, 0.35)',
  transparent: 'transparent',
};

const sizes = {
  // like antd
  heightLg: 50,
  height: 40,
  heightSm: 32,
  // Radius sizes
  radiusSm: 8,
  radiusMd: 10,
  radiusLg: 16,
  radiusFull: 50,

  // Padding Margin, Spacing sizes
  sizeXxl: 64,
  sizeXl: 48,
  sizeLg: 32,
  sizeMd: 24,
  sizeSm: 16,
  sizeXs2: 14,
  sizeXs: 12,
  sizeXxs: 6,
  sizeTiny: 4,
  sizeMicro: 2,
  sizeDefault: 1,

  // Font sizes
  h1: 80,
  h2: 60,
  h3: 40,
  h4: 28,
  h5: 24,
  h6: 20,
  h7: 18,
  body1: 16,
  body2: 14,
  caption: 12,
  label: 11,
};

const shadows = {
  mainShadow: {
    shadowColor: 'rgba(30, 30, 30, 0.08)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 5,
  },
  //child
  blackShadowBase: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    elavation: 5,
  },
  brandShadowBase: {
    shadowColor: 'rgba(0, 177, 225, 0.1)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 20,
    shadowOpacity: 1,
    elavation: 5,
  },
};

export {colors, sizes, shadows};
