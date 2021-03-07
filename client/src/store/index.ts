import { createStore } from 'vuex';
import { match } from './match';

export const store = createStore({
  modules: {
    match: {
      namespaced: true,
      ...match,
    },
  },
});
