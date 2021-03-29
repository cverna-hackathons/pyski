import React, { useEffect } from 'react';
import { useLogout } from './useLogout';

export const Logout:React.FC = () => {
  const logoutAction = useLogout();
  useEffect(logoutAction, []);

  return null;
}
