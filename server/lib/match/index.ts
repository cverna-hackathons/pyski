import { GameResult } from "../game";
import { GameOptions, getDefaultGameOptions } from "../game/options";

export interface MatchResults {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  resultSets: GameResult[];
}

export interface MatchOptions extends GameOptions {
  NUM_OF_GAMES: number;
}

export const getDefaultMatchOptions = (): MatchOptions => ({
  ...getDefaultGameOptions(),
  NUM_OF_GAMES: 5,
})