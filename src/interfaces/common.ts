export enum UserNotificationsOptions {
  OrderStatus = 'Order statuses',
  PasswordChange = 'Password changes',
  SpecialOffers = 'Special offers',
  Newsletter = 'Newsletter'
}

export interface UserProfile {
  avatarImageUri: string | null,
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