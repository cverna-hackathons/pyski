import React from 'react';
import {
  PASSWORD_RULES,
  NAME_RULES,
  useSignup,
} from './useSignup';

export const Signup: React.FC = () => {
  const {
    email,
    handleEmailChange,
    handleNameChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleSignupAttempt,
    inputValid,
    name,
    nameRulesMet,
    password,
    passwordConfirmation,
    passwordMatchesConfirmation,
    passwordRulesMet,
  } = useSignup();

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSignupAttempt}>
        <p>
          <label>
            Name (Nickname):
            <br />
            <input value={name} onChange={handleNameChange} />
          </label>
        </p>
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
          <label>
            Confirm password:
            <br />
            <input type="password" value={passwordConfirmation} onChange={handlePasswordConfirmationChange} />
          </label>
        </p>
        <div style={{ color: 'red' }}>
          {!passwordMatchesConfirmation &&
            <p>Passwords have to match.</p>
          }
          {!passwordRulesMet && (
            <p>
              Password has to be between { PASSWORD_RULES.minLength } and {''}
              { PASSWORD_RULES.maxLength } characters long.
            </p>
          )}
          {!nameRulesMet && (
            <p>
              Name (nickname) has to be between { NAME_RULES.minLength } and {''}
              { NAME_RULES.maxLength } characters long.
            </p>
          )}
        </div>
        <p>
          <button type="submit" disabled={!inputValid}>Submit</button>
        </p>
      </form>
    </div>
  );
}