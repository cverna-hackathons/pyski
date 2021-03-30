import { useState, ChangeEvent, FormEvent } from 'react';
import { useAuthorization } from './Authorization';

interface HookResult {
  email: string;
  password: string;
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLoginAttempt: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  inputValid: boolean;
}

export const useLogin = (): HookResult => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { login } = useAuthorization();

  const handleLoginAttempt = async (event: FormEvent) => {
    event.preventDefault();
    login?.(email, password);
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
