import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

import { CurrentUser } from '../graphql/authentication';
import { clearToken, setToken } from './token';
import { graphql } from '../graphql';
import { getCurrentUser } from '../graphql/actions/getCurrentUser';
import { ROUTES } from '../navigation/Routes';
import { loginUser } from '../graphql/actions/loginUser';

interface Authorization {
  logout?(): void;
  login?(email: string, password: string): void;
  user?: CurrentUser;
}

type GetUserDataResponse = {
  currentUser: CurrentUser;
};

type LoginResponseData = {
  loginUser: string;
};

export const AuthorizationContext = React.createContext<Authorization>({});

export const AuthorizationProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>();
  const navigate = useNavigate();
  const [login] = useMutation<LoginResponseData>(loginUser);
  const logout = () => {
    clearToken();
    setUser(undefined);
    navigate(ROUTES.HOME);
  };

  const fetchUser = () => {
    graphql
      .query<GetUserDataResponse>({
        query: getCurrentUser,
      })
      .then(({ data }) => {
        if (data?.currentUser) {
          setUser(data.currentUser);
          return;
        }

        logout();
      })
      .catch(logout);
  };

  const handleLogin = useCallback(async (email: string, password: string) => {
    const { data } = await login({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
    if (data?.loginUser) {
      setToken(data.loginUser);
      fetchUser();
      navigate('/');
    }
  }, [fetchUser, login]);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthorizationContext.Provider
      value={{
        user,
        logout,
        login: handleLogin,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = (): Authorization => {
  return useContext(AuthorizationContext);
};
