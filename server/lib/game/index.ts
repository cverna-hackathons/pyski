import { Grid } from "../grid/grid";

export interface MoveStackItem {
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
  invalidMoveOfPlayer: number | null;
  lastGrid: Grid;
  maxRoundsExceeded: boolean;
  moveStack: MoveStackItem[];
  playerMarks: number[];
  tie: boolean;
  winner: number | null;
}
