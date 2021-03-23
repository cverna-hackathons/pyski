export const Token = () => {
  return {
    get() {
      return window.localStorage.getItem('token');
    },
    set(value: string) {
      window.localStorage.setItem('token', value);
    },
  };
};

export type CurrentUser = {
  email: string;
  id: string;
  name: string;
};
export const authentication = () => {
  const token = Token();
  let user: CurrentUser;
  const state = {
    token,
    user: {
      get() {
        return user;
      },
      isAuthenticated(): boolean {
        console.log('isAuthenticated user', state.user.get());
        return !!token.get() && !!state.user.get();
      },
      set(u: CurrentUser) {
        user = u;
      },
    },
  };

  return state;
};
