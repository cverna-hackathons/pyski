import { GameOptions, getDefaultGameOptions } from "../game/options";
import { GameResult } from "../game";

export interface MatchResult {
  playersResults: number[];
  playersFaults: number[];
  ties: number;
  maximumRoundsExceeds: number;
  gameResults: GameResult[];
}

export interface MatchOptions extends GameOptions {
  NUM_OF_GAMES: number;
}

export const getDefaultMatchOptions = (): MatchOptions => ({
  ...getDefaultGameOptions(),
  NUM_OF_GAMES: 5,
})
