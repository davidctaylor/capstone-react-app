import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StackNavigationType } from '@common/interfaces';
import { STYLE_BUTTON, THEME_COLORS } from '@common/styles';

import { Route } from '@react-navigation/native';

const styles = StyleSheet.create({
  buttonAvatar: {
    backgroundColor: THEME_COLORS.primaryMain,
    borderWidth: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderRadius: 17,
    height: 34,
    width: 34,
  },
});

interface HeaderProps {
  avatarLabel: string;
  avatarImageUri: string | null;
  navigation: StackNavigationType;
  route: Route<string>;
  onClickAvatarImage?: () => void;
}

export const navigationOptions = (props: HeaderProps) => {
  return {
    ...(props.route.name === 'Profile' && {
      headerLeft: () => (
        <TouchableOpacity
          style={[]}
          onPress={() => {
            props.navigation.navigate(
              props.route.name === 'Profile' ? 'Home' : 'Profile'
            );
          }}
        >
          <Ionicons
            name="md-arrow-back-circle-sharp"
            size={42}
            color={THEME_COLORS.primaryMain}
          />
        </TouchableOpacity>
      ),
    }),
    headerTitle: () => (
      <Image
        style={{ height: 40, width: 160 }}
        source={require('../../../assets/images/Logo.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
    ),
    ...(props.route.name !== 'onboarding' && {
      headerRight: () => (
        <TouchableOpacity
          style={[STYLE_BUTTON.button, styles.buttonAvatar]}
          onPress={() => {
            props.navigation.navigate(
              props.route.name === 'Profile' ? 'Home' : 'Profile'
            );
          }}
        >
          {props.avatarImageUri ? (
            <Image
              source={{ uri: props.avatarImageUri }}
              style={[STYLE_BUTTON.button, styles.buttonAvatar]}
            />
          ) : (
            <Text
              style={[STYLE_BUTTON.buttonText, STYLE_BUTTON.buttonTextPrimary]}
            >
              {props.avatarLabel}
            </Text>
          )}
        </TouchableOpacity>
      ),
    }),
  };
};
