import { MatchOptions, submitMatch } from '@/actions/match'
import { createStore } from 'vuex'

export const store = createStore({
  state: {},
  mutations: {},
  actions: {
    async submit(_context, options: MatchOptions) {
      const response = await submitMatch(options)
      return response
    },
  },
  modules: {},
})
