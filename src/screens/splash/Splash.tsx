import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import { THEME } from '@styles';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Little Lemon Restaurant</Text>
      <ActivityIndicator size="large" color={THEME.colors.primaryMain} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.highlightLight,
    justifyContent: 'center',
  },
  titleText: {
    color: THEME.colors.primaryMain,
    fontSize: THEME.typography.fontSize32,
    fontFamily: THEME.typography.fontFamilyHighlight,
    textAlign: 'center',
  },
});
