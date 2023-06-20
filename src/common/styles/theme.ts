import { ColorValue } from 'react-native';

export const THEME_COLORS: Record<string, ColorValue> = {
  highlightDark: '#333333',
  highlightLight: '#EDEFEE',
  background: '#FFF',
  backgroundLight: '#f4f4f4',
  backgroundDark: '#CACBCB',
  primaryMain: '#495E57',
  primaryMinor: '#F4CE14',
  secondaryMain: '#EE9972',
  secondaryMinor: '#FBDABB',
  textStandard: '#333333',
  textWhite: '#FFF',
};

export const THEME_TYPOGRAPHY: Record<string, string | number> = {
  fontFamilyBold: 'Karla_700Bold',
  fontFamilyStandard: 'Karla_400Regular',
  fontFamilyMedium: 'Karla_500Medium',
  fontFamilyHighlight: 'MarkaziText_400Regular',
  fontSize40: 40,
  fontSize32: 32,
  fontSize24: 24,
  fontSize20: 20,
  fontSize17: 17,
  fontSize15: 15,
};

export const STYLE_BUTTON: Record<
  string,
  Record<string, string | number | ColorValue>
> = {
  button: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: THEME_COLORS.backgroundLight,
    borderColor: THEME_COLORS.primaryMain,
    borderWidth: 2,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    height: 44,
    paddingLeft: 17,
    paddingRight: 17,
    opacity: 1,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPrimary: {
    backgroundColor: THEME_COLORS.primaryMain,
  },
  buttonText: {
    color: THEME_COLORS.primaryMain,
    fontSize: THEME_TYPOGRAPHY.fontSize17,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: THEME_COLORS.textWhite,
  },
};
