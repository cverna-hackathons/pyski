import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import { GamePlayer } from '../game';
import { createInteractivePlayer } from '../player/createInteractivePlayer';
import { Player } from './Player.entity';
import { spawnPlayerRuntime } from './spawnPlayerRuntime';

export enum PLAYER_TYPES {
  INTERACTIVE = 'interactive',
  LOCAL = 'local',
  REPO = 'repository',
}

type PlayerLoaders = {
  [index in PLAYER_TYPES]: (player: Player) => Promise<GamePlayer>;
};

const playerLoaders: PlayerLoaders = {
  interactive: async (player) => createInteractivePlayer(player),
  local: async ({ path }) => loadFromLocal(path),
  repository: async ({ path }) => loadFromRepo(path),
};

const executeCommand = promisify(exec);

export const playerLoader = async (player: Player): Promise<GamePlayer> => {
  const playerType: PLAYER_TYPES = player.type;
  const gamePlayer = await playerLoaders[playerType](player);

  return gamePlayer;
};

// function isGitRepo(path: string): boolean {
//   var pattern = new RegExp(
//     '((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?',
//   );

//   return pattern.test(path);
// }

async function loadFromRepo(repoPath: string): Promise<GamePlayer> {
  return loadFromLocal(path.resolve(await cloneRepo(repoPath), 'dist'));
}

async function cloneRepo(repoPath: string): Promise<string> {
  const targetPath = await createTmpDirectory();
  await executeCommand(`git clone ${repoPath} ${targetPath}`);
  return targetPath;
}

async function createTmpDirectory(): Promise<string> {
  const timestamp = Date.now();
  const targetPath = path.resolve('/tmp', `${timestamp}`);

  await mkdir(targetPath);

  return targetPath;
}

async function loadFromLocal(filePath: string): Promise<GamePlayer> {
  let player: GamePlayer;

  filePath = path.resolve(__dirname, `../localPlayers/${filePath}`);
  await access(filePath);
  const playFunction = spawnPlayerRuntime(filePath);

  player = {
    isInteractive: false,
    name: filePath,
    play: playFunction,
  };

  return player;
}
