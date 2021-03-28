import * as CP from 'child_process';
import { resolve } from 'path';
import { MoveCoordinates, NextMoveInfo } from '../game';
import { Grid } from '../grid/grid';

const play = (
  playerRuntime: CP.ChildProcess,
  filePath: string,
  grid: Grid,
  info: NextMoveInfo,
): Promise<MoveCoordinates> => new Promise((resolve) => {
  playerRuntime.send({
    filePath,
    grid,
    info,
  });
  playerRuntime.on(
    'message', (move: MoveCoordinates) => resolve(move)
  );
});

export const spawnPlayerRuntime = (filePath: string): Function => {
  const playerRuntime = CP.fork(
    resolve(__dirname, './playerRuntime.js')
  );

  return async (grid: Grid, info: NextMoveInfo) => await play(
    playerRuntime,
    filePath,
    grid,
    info,
  );
};
