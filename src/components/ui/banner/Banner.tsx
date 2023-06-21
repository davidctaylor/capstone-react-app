import React from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

const MAX_HEIGHT = 200;

interface BannerProps {
  scrollY?: Animated.Value;
}

export const Banner = (props: BannerProps) => {
  const bannerHeight =
    props && props.scrollY
      ? props.scrollY.interpolate({
          inputRange: [0, MAX_HEIGHT - 0],
          outputRange: [MAX_HEIGHT, 0],
          extrapolate: 'clamp',
        })
      : null;

  return (
    <Animated.View
      style={[styles.container, props.scrollY ? { height: bannerHeight } : {}]}
    >
      <Text style={styles.textTitle}>Little Lemon</Text>

      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={[styles.textTitle, styles.textSubTitle]}>Chicago</Text>
          <Text style={styles.textRegular}>
            We are a family owned Mediterranian restaurant focused on the
            traditional recipes server with a modern twist.
          </Text>
        </View>
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
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLORS.primaryMain,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  imageContainer: {
    alignItems: 'center',
    flex: 0.4,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    height: 120,
    width: '100%',
  },
  contentContainer: {
    alignItems: 'center',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textContainer: {
    flex: 0.6,
    alignItems: 'flex-start',
    alignContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  textRegular: {
    color: THEME_COLORS.textWhite,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingBottom: THEME_TYPOGRAPHY.fontSize17 as number,
  },
  textTitle: {
    color: THEME_COLORS.primaryMinor,
    fontSize: THEME_TYPOGRAPHY.fontSize40 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyHighlight as string,
  },
  textSubTitle: {
    color: THEME_COLORS.textWhite,
    fontSize: THEME_TYPOGRAPHY.fontSize32 as number,
  },
});
