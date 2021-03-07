import { Grid } from '../grid/grid';

export interface Move {
  player: number;
  X: number;
  Y: number;
}

export interface GamePlayer {
  name: string;
  isInteractive: boolean;
  play: Function;
}

export interface GameResult {
  finished: boolean;
  firstMovingPlayerIndex: number;
  invalidMoveOfPlayer: number | null;
  lastGrid: Grid;
  maxRoundsExceeded: boolean;
  moveStack: Move[];
  playerMarks: number[];
  tie: boolean;
  winner: number | null;
}

export interface GameOptions {
  GRID_SIZE: [number, number];
  WINNING_LEN: number;
  TIMEOUT: number;
  MAX_ROUNDS: number;
}

export interface GameState {
  gameIndex: number;
  grid: Grid;
  matchId: string;
  options: GameOptions;
  playerIndex: number;
  players: GamePlayer[];
  result: GameResult;
}
