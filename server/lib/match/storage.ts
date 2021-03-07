import * as getId from 'uniqid';
import { readFile, writeFile } from 'fs/promises';
import { MatchState } from '.';

const STORAGE_DIR = `/tmp`;
const getStorageFilePath = (id: string): string =>
  `${STORAGE_DIR}/match-${id}.json`;
const saveToPath = async (id: string, data: MatchState): Promise<void> =>
  writeFile(getStorageFilePath(id), JSON.stringify(data));

export const MatchStorage = {
  async add(data: MatchState): Promise<string> {
    const id = getId();
    await saveToPath(id, data);
    return id;
  },
  async get(id: string): Promise<MatchState> {
    const raw = await readFile(getStorageFilePath(id));
    const data: MatchState = JSON.parse(raw.toString());
    return data;
  },
  async replace(id: string, data: MatchState) {
    await saveToPath(id, data);
    return true;
  },
};
