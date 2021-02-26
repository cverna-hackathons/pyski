import { GameOptions } from "./options"
import { GameStorage } from "./storage"
import { createGrid } from "../grid/grid"
import { Player } from "../players"
import { GameResult } from "."

export interface InteractiveGameOptions {
  options: GameOptions;
  players: Player[];
}

export interface InteractiveGameState extends GameResult {
  id: string;
}

export const setupInteractiveGame = async ({
  options,
  players,
}: InteractiveGameOptions): Promise<InteractiveGameState> => {

  // set a grid up, assign player marks
  const grid = createGrid(options.GRID_SIZE[0], options.GRID_SIZE[1])
  // randomly assign first player
  const indexOfFirstPlayer = Math.floor(Math.random() * players.length)
  // set a game state up
  const stateToStore = {
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

  // let's persist the game state and obtain game id
  const id = await GameStorage.add(stateToStore)

  return {
    ...stateToStore,
    id,
  }
}
