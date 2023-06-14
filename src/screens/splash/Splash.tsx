import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  View,
} from 'react-native';
import { THEME } from '@styles';
import { Header } from '@components/ui';

export const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <ActivityIndicator style={styles.activity} size="large" color={THEME.colors.primaryMain}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.highlightLight,
  },
  activity: {
    flex: 1,
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 30,
    paddingTop: 50,
    paddingBottom: 40,
    paddingLeft: 0,
    textAlign: 'center',
  },
});