export interface GamePlayer {
  name: string;
  isInteractive: boolean;
  play: Function;
}

export type MoveCoordinates = number[];

export interface NextMoveInfo {
  mark: number;
  winningLength: number;
  currentRound: number;
  currentMove: number;
}
