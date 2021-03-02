import { GameResult } from '../game';

export interface MatchResults {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  resultSets: GameResult[];
}
