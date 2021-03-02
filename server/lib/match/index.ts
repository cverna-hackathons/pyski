import { GameResult } from '../game';

export interface MatchResult {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  gameResults: GameResult[];
}
