import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import {
  AvatarManagerComponent,
  LabelCheckboxComponent,
  LabelInputComponent,
} from '@components/ui';
import {
  ProfileScreenProps,
  UserProfile,
  UserNotificationsOptions,
} from '@common/interfaces';
import { AVATAR_LABEL } from '@common/utils';
import { useValidateUser } from '@common/hooks';
import { STYLE_BUTTON, THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

export const ProfileScreen = (props: ProfileScreenProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(
    props.userProfile
  );
  const updateUserProfile = (key: string, val: string | null) => {
    setUserProfile({ ...userProfile, [key]: val });
  };
  const updateNotifications = (
    option: UserNotificationsOptions,
    enabled: boolean
  ) => {
    setUserProfile({
      ...userProfile,
      notifications: { ...userProfile.notifications, [option]: !enabled },
    });
  };
  const [isValidUser] = useValidateUser({
    emailAddress: userProfile.emailAddress,
    firstName: userProfile.firstName,
  });
  const activeUserProfile: UserProfile = { ...props.userProfile };

  if (!userProfile) {
    return;
  }

  const notifications: React.ReactElement[] = [];
  Object.entries(userProfile && userProfile.notifications).forEach((item) => {
    notifications.push(
      <LabelCheckboxComponent
        label={item[0]}
        value={item[1]}
        key={item[0]}
        onChangeChecked={() =>
          updateNotifications(
            item[0] as UserNotificationsOptions,
            item[1] as boolean
          )
        }
      />
    );
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.textTegular, styles.textTitle]}>
            Personal information
          </Text>
          <AvatarManagerComponent
            avatarLabel={AVATAR_LABEL(
              userProfile.firstName,
              userProfile.lastName
            )}
            avatarImageUri={userProfile.avatarImageUri}
            onChangeAvatarImage={(uri: string | null) =>
              updateUserProfile('avatarImageUri', uri)
            }
          />
          <LabelInputComponent
            label="First name"
            value={userProfile.firstName}
            onChangeText={(text: string) =>
              updateUserProfile('firstName', text)
            }
          />
          <LabelInputComponent
            label="Last name"
            value={userProfile.lastName}
            onChangeText={(text: string) => updateUserProfile('lastName', text)}
          />
          <LabelInputComponent
            label="Email"
            value={userProfile.emailAddress}
            onChangeText={(text: string) =>
              updateUserProfile('emailAddress', text)
            }
            keyboardType={'email-address'}
          />
          <LabelInputComponent
            label="Phone number"
            value={userProfile.phoneNumber}
            onChangeText={(text: string) =>
              updateUserProfile('phoneNumber', text)
            }
            keyboardType={'phone-pad'}
            mask={'(999)-999-9999'}
          />
          <Text
            style={[
              styles.textTegular,
              styles.textTitle,
              styles.textTitleNotification,
            ]}
          >
            Email notifications
          </Text>

          {notifications}

          <TouchableOpacity
            style={[STYLE_BUTTON.button, styles.button, styles.buttonLogout]}
            onPress={props.userLogout}
          >
            <Text style={[STYLE_BUTTON.buttonText]}>Log out</Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[STYLE_BUTTON.button, styles.button, styles.buttonRow]}
              onPress={() => setUserProfile(activeUserProfile)}
            >
              <Text style={[STYLE_BUTTON.buttonText]}>Discard changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!isValidUser}
              style={[
                STYLE_BUTTON.button,
                styles.button,
                styles.buttonRow,
                styles.buttonSave,
                !isValidUser ? styles.buttonDisabled : {},
              ]}
              onPress={() => {
                props.updateUserProfile(userProfile);
              }}
            >
              <Text style={[STYLE_BUTTON.buttonText, styles.buttonTextSave]}>
                Save changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: THEME_COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    marginTop: 12,
    backgroundColor: THEME_COLORS.background,
    alignSelf: 'center',
    width: '94%',
  },
  checkbox: {
    margin: 8,
  },
  button: {
    alignSelf: 'center',
    width: '96%',
    padding: 9,
    marginTop: (THEME_TYPOGRAPHY.fontSize17 as number) * 2,
  },
  buttonDisabled: {
    backgroundColor: THEME_COLORS.primaryMain,
    borderColor: THEME_COLORS.textStandard,
    opacity: 0.5,
  },
  buttonLogout: {
    backgroundColor: THEME_COLORS.primaryMinor,
  },
  buttonSave: {
    backgroundColor: THEME_COLORS.primaryMain,
  },
  buttonTextSave: {
    color: THEME_COLORS.highlightLight,
  },
  buttonTextDisabled: {
    color: THEME_COLORS.textStandard,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME_TYPOGRAPHY.fontSize17 as number,
  },
  buttonRow: {
    width: '46%',
  },
  textTegular: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyMedium as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingBottom: 5,
    paddingLeft: '5%',
    textAlign: 'left',
  },
  textTitle: {
    fontSize: THEME_TYPOGRAPHY.fontSize32 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyMedium as string,
    paddingLeft: '2%',
    paddingTop: THEME_TYPOGRAPHY.fontSize17 as number,
  },
  textTitleNotification: {
    fontSize: THEME_TYPOGRAPHY.fontSize24 as number,
    paddingBottom: THEME_TYPOGRAPHY.fontSize17 as number,
  },
});
