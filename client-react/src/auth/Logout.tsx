import React, { useEffect } from 'react';
import { useAuthorization } from './Authorization';

export const Logout:React.FC = () => {
  const  { logout } = useAuthorization();
  useEffect(() => {
    logout?.();
  }, []);

  return null;
}
