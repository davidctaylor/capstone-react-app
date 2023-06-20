import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Banner, LabelInputComponent } from '@components/ui';
import { STYLE_BUTTON, THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';
import { useValidateUser } from '@common/hooks';
import { OnboardingScreenProps } from '@common/interfaces';

export const OnboardingScreen = (props: OnboardingScreenProps) => {
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [isValidUser] = useValidateUser({
    emailAddress: emailAddress,
    firstName: firstName,
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Banner />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={[styles.textRegular, styles.textTitle]}>
            Let us get to know you
          </Text>
          <LabelInputComponent
            label="First name"
            value={firstName}
            onChangeText={(text: string) => setFirstName(text)}
          />
          <LabelInputComponent
            label="Email"
            value={emailAddress}
            keyboardType={'email-address'}
            onChangeText={(text: string) => setEmailAddress(text)}
          />
          <TouchableOpacity
            disabled={!isValidUser}
            style={[
              STYLE_BUTTON.button,
              styles.button,
              !isValidUser ? STYLE_BUTTON.buttonDisabled : {},
            ]}
            onPress={() => {
              props.setOnboardingState(emailAddress, firstName);
            }}
          >
            <Text
              style={[
                STYLE_BUTTON.buttonText,
                !isValidUser ? styles.buttonTextDisabled : {},
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
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
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: THEME_COLORS.backgroundDark,
    backgroundColor: THEME_COLORS.background,
    width: '94%',
    marginTop: 22,
  },
  button: {
    alignSelf: 'center',
    width: '96%',
    marginBottom: 44,
    marginTop: 44,
  },
  buttonText: {
    color: THEME_COLORS.primaryMain,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: THEME_COLORS.textStandard,
  },
  textRegular: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    textAlign: 'left',
  },
  textTitle: {
    fontSize: THEME_TYPOGRAPHY.fontSize32 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyMedium as string,
    paddingTop: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingLeft: '2%',
  },
});
