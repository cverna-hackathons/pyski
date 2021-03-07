import { GameStorage } from './storage';
import { createGrid } from '../grid/grid';
import { GamePlayer, GameState } from '.';
import { MatchStorage } from '../match/storage';
import { MatchOptions, MatchState } from '../match';

export interface InteractiveGameOptions {
  options: MatchOptions;
  players: GamePlayer[];
}

export const setupInteractiveGame = async ({
  options,
  players,
}: InteractiveGameOptions): Promise<GameState> => {
  // set a grid up, assign player marks
  const grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1]);
  // randomly assign first player
  const indexOfFirstPlayer = Math.floor(Math.random() * players.length);
  // set a game state up
  const match: MatchState = {
    id: '',
    options,
    result: {
      gameResults: [],
      maximumRoundsExceeds: 0,
      playersFaults: [],
      playersResults: [],
      ties: 0,
    },
  }
  const stateToStore: GameState = {
    gameIndex: 0,
    grid,
    matchId: await MatchStorage.add(match),
    options,
    playerIndex: 0,
    players,
    result: {
      finished: false,
      firstMovingPlayerIndex: indexOfFirstPlayer,
      invalidMoveOfPlayer: null,
      lastGrid: grid,
      maxRoundsExceeded: false,
      moveStack: [],
      playerMarks: Array(players.length).fill(1).map((v, idx) => v + idx),
      tie: false,
      winner: null,
    }
  };

  // let's persist the game state and obtain game id
  stateToStore.matchId =
  await GameStorage.add(stateToStore);

  return stateToStore;
};
