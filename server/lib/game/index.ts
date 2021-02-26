import { Grid } from "../grid/grid";

export interface MoveStackItem {
  player: number;
  X: number;
  Y: number;
}

export interface GameResult {
  finished: boolean;
  firstMovingPlayerIndex: number;
  invalidMoveOfPlayer: number | null;
  lastGrid: Grid | undefined;
  maxRoundsExceeded: boolean;
  moveStack: MoveStackItem[];
  playerMarks: number[];
  tie: boolean;
  winner: number | null;
}
