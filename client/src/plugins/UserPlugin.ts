import { query, auth } from '@/utils/graphql';
import gql from 'graphql-tag';
import Vue from 'vue';

export type CurrentUserData = {
  email?: string;
  id?: string;
  name?: string;
};

export interface CurrentUser extends CurrentUserData {
  logout: Function;
  isLoaded: Function;
  load: Function;
  set: Function;
  get: Function;
}

declare module 'vue/types/vue' {
  interface Vue {
    $user: CurrentUser;
  }
}

type GetUserDataResponse = {
  currentUser: CurrentUserData;
};

const getCurrentUser = async () => {
  const { currentUser } = await query<GetUserDataResponse>(
    gql`
      query {
        currentUser {
          id
          name
          email
        }
      }
    `,
    {},
  );

  return currentUser;
};

export function User(vue: typeof Vue): void {
  const user: CurrentUser = {
    id: undefined,
    name: undefined,
    email: undefined,
    logout() {
      auth.token.set('');
      user.id = undefined;
      user.name = undefined;
      user.email = undefined;
    },
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
    async load(): Promise<boolean> {
      let loaded: boolean;

      try {
        user.set(await getCurrentUser());
        loaded = true;
      } catch (error) {
        loaded = false;
      }

      return loaded;
    },
    set(data: CurrentUserData) {
      user.id = data.id;
      user.name = data.name;
      user.email = data.email;
    },
  };
  vue.prototype.$user = Vue.observable(user);
  vue.mixin({
    mounted() {
      console.log('created user instance');
    },
  });
}
