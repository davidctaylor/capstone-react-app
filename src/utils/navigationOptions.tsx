import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { STYLE_BUTTON, THEME } from '@styles';

const styles = StyleSheet.create({
  buttonAvatar: {
    backgroundColor: THEME.colors.primaryMain,
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
  onChangeAvatarImage: (uri: string | null) => void;
}

 export const navigationOptions = (path: string, props: HeaderProps) => {
  return {
    ...(path !== 'onboarding' && {headerLeft: () => (
      <TouchableOpacity
        style={[]}>
        <Ionicons name="md-arrow-back-circle-sharp" size={42} color={THEME.colors.primaryMain} />
      </TouchableOpacity>)
      }),
    headerTitle: () => (
      <Image
        style={{height: 40, width: 160}}
        source={require('../../assets/images/Logo.png')}
        resizeMode='contain'
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}/>
    ),
    ...(path !== 'onboarding' && {headerRight: () => (
      <TouchableOpacity
        style={[STYLE_BUTTON.button, styles.buttonAvatar]}>
        {props.avatarImageUri ? 
          (<Image source={{ uri: props.avatarImageUri }} style={[STYLE_BUTTON.button, styles.buttonAvatar]}/>) : 
          (<Text style={[STYLE_BUTTON.buttonText, STYLE_BUTTON.buttonTextPrimary]}>{props.avatarLabel}</Text>)
        }
      </TouchableOpacity>)
    }),
  };
}