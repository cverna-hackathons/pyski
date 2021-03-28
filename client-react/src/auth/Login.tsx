import React from 'react';
import { useLogin } from './useLogin';

export const Login: React.FC = () => {
  const {
    email,
    handleEmailChange,
    handlePasswordChange,
    handleLoginAttempt,
    inputValid,
    password,
  } = useLogin();

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginAttempt}>
        <p>
          <label>
            Email:
            <br />
            <input value={email} onChange={handleEmailChange} />
          </label>
        </p>
        <p>
          <label>
            Password:
            <br />
            <input type="password" value={password} onChange={handlePasswordChange} />
          </label>
        </p>
        <p>
          <button type="submit" disabled={!inputValid}>Login</button>
        </p>
      </form>
    </div>
  );
}