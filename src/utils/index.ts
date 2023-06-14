/* eslint-disable-next-line */
const VALIDATE_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
export const VALID_EMAIL_ADDRESS = (emailAddress: string): boolean => emailAddress.match(VALIDATE_EMAIL_REGEX) !== null;

export const AVATAR_LABEL = (first: string, last: string): string => {
  return `${first && first[0]}${last && last[0]}`.toLocaleUpperCase();
}

export * from './useUpdate';
export * from './navigationOptions';