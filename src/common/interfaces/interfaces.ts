import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum UserNotificationsOptions {
  OrderStatus = 'Order statuses',
  PasswordChange = 'Password changes',
  SpecialOffers = 'Special offers',
  Newsletter = 'Newsletter',
}

export interface UserProfile {
  avatarImageUri: string | null;
  emailAddress: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notifications: Record<UserNotificationsOptions, boolean>;
}

export interface ApplicationState {
  isLoading: boolean;
  isOnboardingCompleted: boolean;
  userProfile: UserProfile;
}

export interface ProfileScreenProps {
  userProfile: UserProfile;
  updateUserProfile: (profile: UserProfile) => void;
  userLogout: () => void;
}

export interface OnboardingScreenProps {
  setOnboardingState: (email: string, firstName: string) => void;
}

export type StackNavigationParamListType = {
  Home: undefined;
  Profile: ProfileScreenProps;
  Onboarding: OnboardingScreenProps;
};

export type StackNavigationType =
  NativeStackNavigationProp<StackNavigationParamListType>;
