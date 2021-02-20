import * as getId from 'uniqid';
import { GameResult } from '.';
import { readFile, writeFile } from 'fs/promises'

const STORAGE_DIR = `/tmp`
const getStorageFilePath = (id: string): string => `${STORAGE_DIR}/game-${id}.json`
const saveToPath = async (
  id: string,
  data: GameResult
): Promise<void> => writeFile(getStorageFilePath(id), JSON.stringify(data))

export const GameStorage = {
  async add(data: GameResult): Promise<string> {
    const id = getId()
    await saveToPath(id, data)
    return id
  },
  async get(id: string): Promise<GameResult> {
    const raw = await readFile(getStorageFilePath(id))
    const data: GameResult = JSON.parse(raw.toString())
    return data
  },
  async replace(id: string, data: GameResult) {
    await saveToPath(id, data)
    return true
  }
}