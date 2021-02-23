import { MatchOptions, submitMatch } from '@/actions/match'
import { GRID_SIZES } from '@/constants'
import { createStore } from 'vuex'

interface ResultSet {
  finished: boolean;
  maxRoundsExceeded: boolean;
  tie: boolean;
  lastGrid: number[][];
  moveStack: [number, number][];
  winner: number | null;
}

interface MatchResults {
  playersFaults: number[];
  playersResults: number[];
  ties: number;
  options: MatchOptions;
  resultSets: ResultSet[];
}

interface MatchResponse {
  options: MatchOptions;
  results: MatchResults;
}

export interface State {
  gridWidth: number;
  gridHeight: number;
  maxRounds: number;
  numOfGames: number;
  playerA: string;
  playerB: string;
  winningLength: number;
  results: MatchResults | null;
}

export const match = createStore<State>({
  state: {
    gridWidth: GRID_SIZES[1],
    gridHeight: GRID_SIZES[0],
    maxRounds: 100,
    numOfGames: 5,
    playerA: '',
    playerB: '',
    winningLength: 5,
    results: null,
  },
  mutations: {
    record(state, payload: MatchResponse) {
      state.results = payload.results
    },
    setGridWidth(state, value) {
      state.gridWidth = value
    },
    setGridHeight(state, value) {
      state.gridHeight = value
    },
    setMaxRounds(state, value) {
      state.maxRounds = value
    },
    setNumOfGames(state, value) {
      state.numOfGames = value
    },
    setPlayerA(state, value) {
      state.playerA = value
    },
    setPlayerB(state, value) {
      state.playerB = value
    },
    setWinningLength(state, value) {
      state.winningLength = value
    },
  },
  actions: {
    async submitMatch({ commit }, options: MatchOptions) {
      const response: MatchResponse = await submitMatch(options)
      commit('record', response)
      return response
    },
  },
})
