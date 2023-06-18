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
  ApplicationState,
  UserProfile,
  UserNotificationsOptions,
} from '@interfaces';
import {
  AvatarManagerComponent,
  LabelCheckboxComponent,
  LabelInputComponent,
} from '@components/ui';
import { AVATAR_LABEL, useValidateUser } from '@utils';
import { STYLE_BUTTON, THEME } from '@styles';

export const ProfileScreen = (props: ApplicationState) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(props);
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
  const activeUserProfile: UserProfile = { ...props };

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
        onChangeChecked={() => updateNotifications(item[0], item[1] as boolean)}
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
    backgroundColor: THEME.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    marginTop: 12,
    backgroundColor: THEME.colors.background,
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
    marginTop: THEME.typography.fontSize17 * 2,
  },
  buttonDisabled: {
    backgroundColor: THEME.colors.primaryMain,
    borderColor: THEME.colors.textStandard,
    opacity: 0.5,
  },
  buttonLogout: {
    backgroundColor: THEME.colors.primaryMinor,
  },
  buttonSave: {
    backgroundColor: THEME.colors.primaryMain,
  },
  buttonTextSave: {
    color: THEME.colors.highlightLight,
  },
  buttonTextDisabled: {
    color: THEME.colors.textStandard,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME.typography.fontSize17,
  },
  buttonRow: {
    width: '46%',
  },
  textTegular: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
    paddingBottom: 5,
    paddingLeft: '5%',
    textAlign: 'left',
  },
  textTitle: {
    fontSize: THEME.typography.fontSize32,
    fontFamily: THEME.typography.fontFamilyMedium,
    paddingLeft: '2%',
    paddingTop: THEME.typography.fontSize17,
  },
  textTitleNotification: {
    fontSize: THEME.typography.fontSize24,
    paddingBottom: THEME.typography.fontSize17,
  },
});
