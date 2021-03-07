import { GameState } from '.';
import { readFile, writeFile } from 'fs/promises';

const STORAGE_DIR = `/tmp`;
const getStorageFilePath = (id: string): string =>
  `${STORAGE_DIR}/game-${id}.json`;
const saveToPath = async (id: string, data: GameState): Promise<void> =>
  writeFile(getStorageFilePath(id), JSON.stringify(data));

const getId = (data: GameState): string => `${data.matchId}:${data.gameIndex}`

export const GameStorage = {
  async add(data: GameState): Promise<string> {
    const id = getId(data);
    await saveToPath(id, data);
    return id;
  },
  async get(id: string): Promise<GameState> {
    const raw = await readFile(getStorageFilePath(id));
    const data: GameState = JSON.parse(raw.toString());
    return data;
  },
  async replace(data: GameState) {
    await saveToPath(getId(data), data);
    return true;
  },
};
