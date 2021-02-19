import { Grid } from "./grid";

export interface MoveStackItem {
  player: number;
  X: number;
  Y: number;
}

export interface PlayResultSet {
  finished: boolean;
  invalidMoveOfPlayer: number | null;
  lastGrid: Grid | undefined;
  maxRoundsExceeded: boolean;
  moveStack: MoveStackItem[];
  playerMarks: number[];
  tie: boolean;
  winner: number | null;
}
export interface PlayResults {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  resultSets: PlayResultSet[];
}