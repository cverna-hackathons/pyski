import { PlayResultSet } from "./playResults"

export function logGame(playResult: PlayResultSet, printToStdout: boolean) {
  if (printToStdout) {
    console.log('game invalidMoveOfPlayer:', playResult.invalidMoveOfPlayer)
    console.log('game lastGrid:')
    console.log(playResult.lastGrid)
  }
}
