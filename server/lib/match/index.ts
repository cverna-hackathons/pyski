import { getDefaultGameOptions } from "../game/options";
import { GameOptions, GameResult } from "../game";

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

export interface MatchState {
  id: string;
  options: MatchOptions;
  result: MatchResult;
}

export const getDefaultMatchOptions = (): MatchOptions => ({
  ...getDefaultGameOptions(),
  NUM_OF_GAMES: 5,
})
