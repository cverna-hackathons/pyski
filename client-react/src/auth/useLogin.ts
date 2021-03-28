import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../graphql/actions/loginUser';
import { setToken } from './token';

interface HookResult {
  email: string;
  password: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLoginAttempt: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inputValid: boolean;
}

type LoginResponseData = {
  loginUser: string;
};

export const useLogin = (): HookResult => {
  const [ login ] = useMutation<LoginResponseData>(loginUser);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const handleLoginAttempt = async (event: React.FormEvent) => {
    event.preventDefault();
    const { data } = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    if (data?.loginUser) {
      setToken(data.loginUser);
      navigate('/');
    };
  };
  const inputValid = (
    password.length > 0 &&
    email.length > 0
  );

  return {
    email,
    password,
    handleEmailChange: ({ target: { value } }) => setEmail(value),
    handlePasswordChange: ({ target: { value } }) => setPassword(value),
    handleLoginAttempt,
    inputValid,
  };
}
