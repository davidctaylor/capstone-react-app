import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { THEME } from '@styles';

export const Banner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Little Lemon</Text>
      <Text style={[styles.textTitle, styles.textSubTitle]}>Chicago</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textRegular}>
          We are a family owned Mediterranian restaurant focused on the
          traditional recipes server with a modern twist We are a family owned
        </Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../../assets/images/Hero-image.png')}
            resizeMode="cover"
            accessible={true}
            accessibilityLabel={'Little Lemon Logo'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.primaryMain,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: THEME.typography.fontSize17,
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 0.25,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    height: 75,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textRegular: {
    flex: 0.75,
    color: THEME.colors.textWhite,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
    paddingBottom: THEME.typography.fontSize17,
  },
  textTitle: {
    color: THEME.colors.primaryMinor,
    fontSize: THEME.typography.fontSize40,
    fontFamily: THEME.typography.fontFamilyHighlight,
  },
  textSubTitle: {
    color: THEME.colors.textWhite,
    fontSize: THEME.typography.fontSize32,
  },
});
