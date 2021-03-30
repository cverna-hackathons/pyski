import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthorization } from './Authorization';
import { ROUTES } from '../navigation/Routes';

export const UserInfo: React.FC = () => {
  const { user } = useAuthorization();

  if (!user) {
    return null
  }

  return (
    <div>
      <span>
        Logged in as {''}
        <b>{user.email}, </b>
        <Link to={ROUTES.LOGOUT}>log out</Link>.
      </span>
    </div>
  );
}
