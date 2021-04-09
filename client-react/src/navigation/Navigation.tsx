import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from '../auth/Authorization';
import { ROUTES } from './Routes';
import './Navigation.css';

export const Navigation: React.FC = () => {
  const { user } = useAuthorization();
  const isAuthorized = !!user;

  if (!isAuthorized) {
    return (
      <nav>
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.SIGNUP}>Signup</Link>
      </nav>
    );
  }

  return (
    <nav>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.MATCHES}>Matches</Link>
      <Link to={ROUTES.RANKINGS}>Rankings</Link>
      <Link to={ROUTES.SETUP}>New Match</Link>
      <Link to={ROUTES.LOGOUT}>Logout</Link>
    </nav>
  )
};
