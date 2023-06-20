import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
const VALIDATE_EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const VALIDATE_FIRST_NAMEREGEX = /^[A-Za-z]+$/g;

export const useValidateUser = (user: {
  emailAddress: string;
  firstName: string;
}) => {
  const [isUserValid, setUserValid] = useState<boolean>(false);

  useEffect(() => {
    if (
      user.emailAddress.match(VALIDATE_EMAIL_REGEX) !== null &&
      user.firstName.length > 0 &&
      user.firstName.match(VALIDATE_FIRST_NAMEREGEX) !== null
    ) {
      setUserValid(true);
    } else {
      setUserValid(false);
    }
  }, [user]);

  return [isUserValid];
};
