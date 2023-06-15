export const THEME: Record<string, Record<string, string | number>> = {
  colors: {
    highlightDark: '#333333',
    highlightLight: '#EDEFEE',
    background: '#FFF',
    backgroundLight: '#f4f4f4', //'#DDDDDD',
    backgroundDark: '#CACBCB',
    primaryMain: '#495E57',
    primaryMinor: '#F4CE14',
    secondaryMain: '#EE9972',
    secondaryMinor: '#FBDABB',
    textStandard: '#333333',
    textWhite: '#FFF',
  },
  typography: {
    fontFamilyStandard: 'Karla_400Regular',
    fontFamilyMedium: 'Karla_500Medium',
    fontFamilyHighlight: 'MarkaziText_400Regular',
    fontSize32: 32,
    fontSize17: 17,
    fontSize15: 15,
  },
};

export const STYLE_BUTTON: Record<string, Record<string, string | number>> = {
  button: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: THEME.colors.backgroundLight,
    borderColor: THEME.colors.primaryMain,
    borderWidth: 2,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    height: 44,
    paddingLeft: 17,
    paddingRight: 17,
    opacity: 1,
  },
  buttonPrimary: {
    backgroundColor: THEME.colors.primaryMain,
  },
  buttonText: {
    color: THEME.colors.primaryMain,
    fontSize: THEME.typography.fontSize17,
    fontFamily: THEME.typography.fontFamilyStandard,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: THEME.colors.textWhite,
  },
};
