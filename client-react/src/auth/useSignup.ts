import { useState } from 'react';
import { signupUser } from '../graphql/actions/signupUser';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

export const PASSWORD_RULES = {
  minLength: 5,
  maxLength: 128,
};

export const NAME_RULES = {
  minLength: 4,
  maxLength: 64,
};

interface HookResult {
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordConfirmationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignupAttempt: (event: React.FormEvent<HTMLFormElement>) => void;
  inputValid: boolean;
  name: string;
  nameRulesMet: boolean;
  password: string;
  passwordConfirmation: string;
  passwordMatchesConfirmation: boolean;
  passwordRulesMet: boolean;
}

type SignupResponseData = {
  signupUser: boolean;
};

export const useSignup = (): HookResult => {
  const navigate = useNavigate();
  const [ signup, { data } ] = useMutation<SignupResponseData>(signupUser);
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirmation, setPasswordConfirmation ] = useState('');

  const handleSignupAttempt = (event: React.FormEvent) => {
    event.preventDefault();
    signup({
      variables: {
        input: {
          email,
          name,
          password,
        },
      },
    });
  };
  const passwordMatchesConfirmation = (password === passwordConfirmation);
  const nameRulesMet = (
    name.length >= NAME_RULES.minLength &&
    name.length <= NAME_RULES.maxLength
  )
  const passwordRulesMet = (
    password.length >= PASSWORD_RULES.minLength &&
    password.length <= PASSWORD_RULES.maxLength
  )
  const inputValid = (
    passwordRulesMet &&
    nameRulesMet &&
    passwordMatchesConfirmation
  )

  if (data?.signupUser) {
    navigate('login');
  }

  return {
    name,
    email,
    password,
    passwordConfirmation,
    handleEmailChange: ({ target: { value } }) => setEmail(value),
    handleNameChange: ({ target: { value } }) => setName(value),
    handlePasswordChange: ({ target: { value } }) => setPassword(value),
    handlePasswordConfirmationChange: ({ target: { value } }) => setPasswordConfirmation(value),
    handleSignupAttempt,
    nameRulesMet,
    passwordMatchesConfirmation,
    passwordRulesMet,
    inputValid,
  };
}
