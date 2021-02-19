import { GameResult } from "../game";

export interface PlayResults {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  resultSets: GameResult[];
}