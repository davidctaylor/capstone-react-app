import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Karla_400Regular,
  Karla_500Medium,
  Karla_700Bold,
} from '@expo-google-fonts/karla';
import { MarkaziText_400Regular } from '@expo-google-fonts/markazi-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyValuePair } from '@react-native-async-storage/async-storage/lib/typescript/types';
import {
  ApplicationState,
  UserProfile,
  UserNotificationsOptions,
  StackNavigationType,
} from '@interfaces';
import {
  HomeScreen,
  OnboardingScreen,
  ProfileScreen,
  SplashScreen,
} from '@screens';
import { useUpdateEffect, navigationOptions, AVATAR_LABEL } from '@utils';

const Stack = createNativeStackNavigator<StackNavigationType>();
const DEFAULT_APP_STATE = {
  isLoading: true,
  isOnboardingCompleted: false,
  userProfile: {
    avatarImageUri: null,
    emailAddress: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    notifications: {
      [UserNotificationsOptions.OrderStatus]: false,
      [UserNotificationsOptions.PasswordChange]: false,
      [UserNotificationsOptions.SpecialOffers]: false,
      [UserNotificationsOptions.Newsletter]: false,
    },
  },
};

const App = () => {
  const [applicationState, setApplicationState] = useState<ApplicationState>({
    ...DEFAULT_APP_STATE,
  });

  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_500Medium,
    Karla_700Bold,
    MarkaziText_400Regular,
  });

  const setUserProfileState = (profile: UserProfile) => {
    setApplicationState({
      ...applicationState,
      userProfile: { ...profile },
    });
  };

  const setOnboardingState = (emailAddress: string, firstName: string) =>
    setApplicationState({
      ...applicationState,
      isOnboardingCompleted: true,
      userProfile: { ...applicationState.userProfile, emailAddress, firstName },
    });

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(Object.keys(applicationState));
      setApplicationState({ ...DEFAULT_APP_STATE, isLoading: false });
    } catch (e) {
      console.log('remove error', e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const values = await AsyncStorage.multiGet(
          Object.keys(applicationState)
        );
        const initialState: ApplicationState = values.reduce(
          (acc: ApplicationState, curr: KeyValuePair) => {
            const val: boolean | object | null = curr[1]
              ? JSON.parse(curr[1])
              : null;
            if (curr[0] !== 'isLoading' && val !== null) {
              acc[curr[0]] = val;
            }

            return acc;
          },
          { ...applicationState, isLoading: false }
        );

        setApplicationState(initialState);
      } catch (e) {
        console.log('read state error', e);
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const keyValues: [string, string][] = Object.entries(
        applicationState
      ).map((entry) => {
        return [entry[0], JSON.stringify(entry[1])];
      });
      try {
        await AsyncStorage.multiSet(keyValues);
      } catch (e) {
        console.log('update state error', e);
      }
    })();
  }, [applicationState]);

  if (!fontsLoaded) {
    return null;
  }

  if (applicationState.isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {applicationState.isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name="Home"
              options={({ navigation }) =>
                navigationOptions('home', {
                  avatarLabel: AVATAR_LABEL(
                    applicationState.userProfile.firstName,
                    applicationState.userProfile.lastName
                  ),
                  avatarImageUri: applicationState.userProfile.avatarImageUri,
                  navigation,
                })
              }
            >
              {() => <HomeScreen />}
            </Stack.Screen>
            <Stack.Screen
              name="Profile"
              options={({ navigation }) =>
                navigationOptions('profile', {
                  avatarLabel: AVATAR_LABEL(
                    applicationState.userProfile.firstName,
                    applicationState.userProfile.lastName
                  ),
                  avatarImageUri: applicationState.userProfile.avatarImageUri,
                  navigation,
                })
              }
            >
              {() => (
                <ProfileScreen
                  {...applicationState.userProfile}
                  updateUserProfile={setUserProfileState}
                  userLogout={logout}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <Stack.Screen
            name="Onboarding"
            options={navigationOptions('onboarding', {
              avatarLabel: AVATAR_LABEL(
                applicationState.userProfile.firstName,
                applicationState.userProfile.lastName
              ),
              avatarImageUri: applicationState.userProfile.avatarImageUri,
            })}
          >
            {() => <OnboardingScreen setOnboardingState={setOnboardingState} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
