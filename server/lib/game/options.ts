import { GameOptions } from ".";

export function getDefaultGameOptions(): GameOptions {
  return {
    GRID_SIZE: [20, 20],
    WINNING_LEN: 5,
    TIMEOUT: 5000,
    MAX_ROUNDS: 750,
  };
}
