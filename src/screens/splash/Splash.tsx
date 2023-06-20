import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import { THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Little Lemon Restaurant</Text>
      <ActivityIndicator size="large" color={THEME_COLORS.primaryMain} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.highlightLight,
    justifyContent: 'center',
  },
  titleText: {
    color: THEME_COLORS.primaryMain,
    fontSize: THEME_TYPOGRAPHY.fontSize32 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyHighlight as string,
    textAlign: 'center',
  },
});
