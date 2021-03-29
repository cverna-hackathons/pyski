import React from 'react';
import { useUser } from '../auth/useUser';
import { Link } from 'react-router-dom';
import { ROUTES } from './Routes';
import './Navigation.css';

export const Navigation: React.FC = () => {
  const user = useUser();
  const isAuthorized = !!user;

  if (!isAuthorized) {
    return (
      <>
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.SIGNUP}>Signup</Link>
      </>
    );
  }

  return (
    <>
      <Link to={ROUTES.MATCHES}>Matches</Link>
      <Link to={ROUTES.SETUP}>Setup</Link>
      <Link to={ROUTES.LOGOUT}>Logout</Link>
    </>
  )
};
