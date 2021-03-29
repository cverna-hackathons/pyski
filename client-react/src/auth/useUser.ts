import { useNavigate } from 'react-router';
import { getCurrentUser } from '../graphql/actions/getCurrentUser';
import { CurrentUser } from '../graphql/authentication';
import { clearToken } from './token';
import { useEffect, useState } from 'react';
import { graphql } from '../graphql';

type GetUserDataResponse = {
  currentUser: CurrentUser;
};

export const useUser = (): CurrentUser | undefined => {
  const [user, setUser] = useState<CurrentUser>();
  const navigate = useNavigate();
  const handleError = () => {
    clearToken();
    navigate('/login');
  }

  useEffect(() => {
    graphql.query<GetUserDataResponse>({
      query: getCurrentUser,
    }).then(({ data }) => {
      if (data?.currentUser) {
        setUser(data.currentUser);
        return;
      }

      handleError();
    }).catch(handleError);
  }, []);

  return user;
}
