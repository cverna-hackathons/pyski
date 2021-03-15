import * as path from 'path';
import { access, mkdir } from 'fs/promises';
import { promisify } from 'util';
import { exec } from 'child_process';
import { GamePlayer } from '../game';
import { createInteractivePlayer } from '../player/createInteractivePlayer';

export enum PLAYER_TYPES {
  INTERACTIVE = 'interactive',
  LOCAL = 'local',
  REPO = 'repository',
}

type PlayerLoaders = {
  [index in PLAYER_TYPES]: (str: string) => Promise<GamePlayer>;
};

const playerLoaders: PlayerLoaders = {
  interactive: async () => createInteractivePlayer('interactive'),
  local: loadFromLocal,
  repository: loadFromRepo,
};

const executeCommand = promisify(exec);
const getPlayerType = (str: string): PLAYER_TYPES => {
  if (isGitRepo(str)) return PLAYER_TYPES.REPO;
  if (str === '') return PLAYER_TYPES.INTERACTIVE;
  return PLAYER_TYPES.LOCAL;
};

export const playerLoader = async (str: string): Promise<GamePlayer> =>
  playerLoaders[getPlayerType(str)](str);

function isGitRepo(path: string): boolean {
  var pattern = new RegExp(
    '((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?',
  );

  return pattern.test(path);
}

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

  try {
    filePath = path.resolve(__dirname, filePath);
    await access(filePath);
    const playFunction = require(filePath);
    player = {
      isInteractive: false,
      name: filePath,
      play: playFunction,
    };
  } catch (error) {
    console.error('error reading path', filePath, error);
    player = createInteractivePlayer(filePath);
  }

  return player;
}
