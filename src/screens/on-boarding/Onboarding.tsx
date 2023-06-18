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
import { STYLE_BUTTON, THEME } from '@styles';
import { useValidateUser } from '@utils';

export const OnboardingScreen = (props: {
  setOnboardingState: (email: string, firstName: string) => void;
}) => {
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
    backgroundColor: THEME.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  contentContainer: {
    alignSelf: 'center',
    borderWidth: 0,
    borderColor: THEME.colors.backgroundDark,
    backgroundColor: THEME.colors.background,
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
    color: THEME.colors.primaryMain,
    fontSize: THEME.typography.fontSize17,
    fontFamily: THEME.typography.fontFamilyStandard,
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: THEME.colors.textStandard,
  },
  textRegular: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
    textAlign: 'left',
  },
  textTitle: {
    fontSize: THEME.typography.fontSize32,
    fontFamily: THEME.typography.fontFamilyMedium,
    paddingTop: THEME.typography.fontSize17,
    paddingLeft: '2%',
  },
});
