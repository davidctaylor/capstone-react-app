import React from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEME } from '@styles';

interface BannerProps {
  onChangeSearch: (text: string) => void;
}

export const Banner = (props: BannerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Little Lemon</Text>
      <Text style={[styles.textTitle, styles.textSubTitle]}>Chicago</Text>
      <View style={styles.textContainer}>
        <Text style={styles.textRegular}>
          We are a family owned Mediterranian restaurant focused on the
          traditional recipes server with a modern twist
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
      <View style={styles.seachContainer}>
        <Ionicons
          style={styles.searchIcon}
          name="md-search-sharp"
          size={17}
          color={THEME.colors.primaryMain}
        />
        <TextInput
          autoCapitalize={'none'}
          style={styles.searchInput}
          clearButtonMode={'while-editing'}
          onChangeText={(text: string) => props.onChangeSearch(text)}
        />
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
    flex: 0.25,
    overflow: 'hidden',
    borderRadius: 6,
  },
  image: {
    height: 75,
    width: '100%',
  },
  textContainer: {
    alignItems: 'center',
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
  seachContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.backgroundLight,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
  },
  searchIcon: {
    paddingLeft: THEME.typography.fontSize17 / 2,
  },
  searchInput: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundLight,
    color: THEME.colors.textStandard,
    fontSize: THEME.typography.fontSize17,
    height: 34,
    borderRadius: 6,
  },
});
