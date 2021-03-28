import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router';
import { getCurrentUser } from '../graphql/actions/getCurrentUser';
import { CurrentUser } from '../graphql/authentication';
import { clearToken } from './token';

type GetUserDataResponse = {
  currentUser: CurrentUser;
};

export const useUser = (): CurrentUser | undefined => {
  const {
    data,
    error,
    // loading,
  } = useQuery<GetUserDataResponse>(getCurrentUser)
  const navigate = useNavigate();

  if (error) {
    console.log('error getting user', error);
    clearToken();
    navigate('/login');
  }
  return data?.currentUser;
}