import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './useUser';

export const UserInfo: React.FC = () => {
  const user = useUser();

  if (!user) {
    return null
  }

  return (
    <div>
      <span>
        Logged in as {''}
        <b>{user.email}, </b>
        <Link to="/logout">log out</Link>.
      </span>
    </div>
  );
}