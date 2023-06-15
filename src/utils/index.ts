export const AVATAR_LABEL = (first: string, last: string): string => {
  return `${first && first[0]}${last && last[0]}`.toLocaleUpperCase();
};

export * from './hooks/useUpdate';
export * from './hooks/useValidateUser';
export * from './common/navigationOptions';
