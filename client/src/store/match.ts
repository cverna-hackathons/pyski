import { MatchOptions, submitMatch } from '@/actions/match';
import { Player } from '@/actions/players';
import { GRID_SIZES } from '@/constants';
import { query } from '@/utils/graphql';
import { StoreOptions } from 'vuex';
import getPlayersQuery from '../queries/getPlayers'

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

export interface State {
  players: Player[];
  gridWidth: number;
  gridHeight: number;
  maxRounds: number;
  numOfGames: number;
  playerA: string;
  playerB: string;
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
    async submitMatch({ commit, state }) {
      const response: MatchResponse = await submitMatch({
        grid_height: state.gridHeight,
        grid_width: state.gridWidth,
        max_rounds: state.maxRounds,
        num_of_games: state.numOfGames,
        repo_A: state.playerA,
        repo_B: state.playerB,
        winning_length: state.winningLength,
      });
      commit('results', response);
      return response;
    },
    async loadPlayers({ commit }) {
      const { players } = await query<PlayersResponse>(getPlayersQuery, {});

      console.log('players', players);
      commit('players', players);
      commit('setPlayerA', players[0].id);
      commit('setPlayerB', players[0].id);
      return players;
    },
  },
};
