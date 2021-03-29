import { useNavigate } from 'react-router-dom';
import { clearToken } from './token';
import { ROUTES } from '../navigation/Routes';

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    clearToken();
    navigate(ROUTES.LOGIN);
  }
}
