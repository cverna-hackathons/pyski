import Vue from 'vue';

export type CurrentUserData = {
  email?: string;
  id?: string;
  name?: string;
};

export interface CurrentUser extends CurrentUserData {
  isLoaded: Function;
  set: Function;
  get: Function;
}

declare module 'vue/types/vue' {
  interface Vue {
    $user: CurrentUser;
  }
}

export function User(vue: typeof Vue): void {
  const user: CurrentUser = {
    id: undefined,
    name: undefined,
    email: undefined,
    isLoaded(): boolean {
      return user.id !== undefined && user.id.length > 0;
    },
    get(): CurrentUserData {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },
    set(data: CurrentUserData) {
      user.id = data.id;
      user.name = data.name;
      user.email = data.email;
    },
  };
  vue.prototype.$user = Vue.observable(user);
}
