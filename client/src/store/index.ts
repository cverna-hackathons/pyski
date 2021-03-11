import { match } from './match';

export const store = {
  modules: {
    match: {
      namespaced: true,
      ...match,
    },
  },
};
