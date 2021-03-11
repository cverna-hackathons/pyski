import { createMatch } from '@/actions/createMatch';
import { MatchOptions } from '@/actions/match';
import { Player } from '@/actions/players';
import { GRID_SIZES } from '@/constants';
import { mutate, query } from '@/utils/graphql';
import { StoreOptions } from 'vuex';
import { getPlayers as getPlayersQuery } from '../queries/getPlayers';

export interface GameResult {
  finished: boolean;
  maxRoundsExceeded: boolean;
  tie: boolean;
  lastGrid: number[][];
  moveStack: [number, number][];
  winner: number | null;
}

interface MatchResult {
  playersFaults: number[];
  playersResults: number[];
  ties: number;
  options: MatchOptions;
  gameResults: GameResult[];
}

export interface MatchResponse {
  options: MatchOptions;
  results: MatchResult;
}

interface PlayersResponse {
  players: Player[];
}

interface CreateMatchResponse {
  createMatch: {
    id: string;
  };
}

export interface State {
  players: Player[];
  gridWidth: number;
  gridHeight: number;
  maxRounds: number;
  numOfGames: number;
  playerA: string;
  playerB: string;
  timeout: number;
  winningLength: number;
  matchResult?: MatchResult;
  matchOptions?: MatchOptions;
}

export const match: StoreOptions<State> = {
  state: {
    players: [],
    gridWidth: GRID_SIZES[0],
    gridHeight: GRID_SIZES[0],
    maxRounds: 100,
    numOfGames: 5,
    playerA: 'server/lib/players/dummy.js',
    playerB: 'server/lib/players/dummy.js',
    timeout: 15000,
    winningLength: 5,
  },
  mutations: {
    results(state, payload: MatchResponse) {
      state.matchResult = payload.results;
      state.matchOptions = payload.options;
    },
    players(state, payload: Player[]) {
      state.players = payload;
    },
    setGridWidth(state, value) {
      state.gridWidth = value;
    },
    setGridHeight(state, value) {
      state.gridHeight = value;
    },
    setMaxRounds(state, value) {
      state.maxRounds = value;
    },
    setNumOfGames(state, value) {
      state.numOfGames = value;
    },
    setPlayerA(state, value) {
      state.playerA = value;
    },
    setPlayerB(state, value) {
      state.playerB = value;
    },
    setWinningLength(state, value) {
      state.winningLength = value;
    },
  },
  actions: {
    async submitMatch({ state }) {
      const {
        createMatch: { id },
      } = await mutate<CreateMatchResponse>(createMatch, {
        input: {
          gridHeight: state.gridHeight,
          gridWidth: state.gridWidth,
          maxRounds: state.maxRounds,
          numOfGames: state.numOfGames,
          playerA: state.playerA,
          playerB: state.playerB,
          timeout: state.timeout,
          winningLength: state.winningLength,
        },
      });
      console.log('submitMatch', id);
      // commit('results', response);
      return id;
    },
    async loadPlayers({ commit }) {
      const { players } = await query<PlayersResponse>(getPlayersQuery, {});
      commit('players', players);
      commit('setPlayerA', players[0].id);
      commit('setPlayerB', players[1].id);
      return players;
    },
  },
};
