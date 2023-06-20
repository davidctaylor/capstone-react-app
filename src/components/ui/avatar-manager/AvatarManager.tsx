import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImagePickerResult as ExpoImagePickerResult } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { STYLE_BUTTON, THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

type ImagePickerResult = ExpoImagePickerResult & { cancelled?: boolean };

interface AvatarManagerProps {
  avatarLabel: string;
  avatarImageUri: string | null;
  onChangeAvatarImage: (uri: string | null) => void;
}

export const AvatarManagerComponent = (props: AvatarManagerProps) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const pickImage = async () => {
    setImageLoading(true);
    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      }
    );

    setImageLoading(false);

    if (!result.canceled) {
      delete result.cancelled;
      props.onChangeAvatarImage(result.assets[0].uri);
    }
  };

  return (
    <>
      <Text style={[styles.regularText]}>Avatar</Text>
      <View style={styles.buttonContainer}>
        <View style={[STYLE_BUTTON.button, styles.buttonAvatar]}>
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
        </View>
        <TouchableOpacity
          style={[
            STYLE_BUTTON.button,
            STYLE_BUTTON.buttonPrimary,
            imageLoading ? styles.buttonDisabled : {},
          ]}
          onPress={pickImage}
        >
          <Text
            style={[
              STYLE_BUTTON.buttonText,
              STYLE_BUTTON.buttonTextPrimary,
              imageLoading ? styles.buttonTextDisabled : {},
            ]}
          >
            Change
          </Text>
          {imageLoading && (
            <ActivityIndicator
              style={styles.activity}
              size="small"
              color={THEME_COLORS.textWhite}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[STYLE_BUTTON.button]}
          onPress={() => props.onChangeAvatarImage(null)}
        >
          <Text style={[STYLE_BUTTON.buttonText]}>Remove</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: '96%',
  },
  buttonAvatar: {
    backgroundColor: THEME_COLORS.primaryMain,
    borderWidth: 0,
    borderRadius: 28,
    height: 56,
    width: 56,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTextDisabled: {
    opacity: 0,
  },
  regularText: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingBottom: 5,
    paddingLeft: '2p%',
    paddingTop: (THEME_TYPOGRAPHY.fontSize17 as number) * 2,
    textAlign: 'left',
  },
  activity: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
