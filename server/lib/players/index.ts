import { resolve } from 'path';
import { getRepository } from 'typeorm';
import { Player } from './Player.entity';
import { PLAYER_TYPES } from './playerLoader';

interface LocalPlayer {
  id: string;
  title: string;
  path: string;
  type: PLAYER_TYPES.LOCAL;
}

export async function getLocalPlayers(): Promise<LocalPlayer[]> {
  const localPlayerRecords = await getRepository(Player).find({
    where: { type: PLAYER_TYPES.LOCAL }
  })

  return localPlayerRecords.map(({
    id,
    name,
    path = './',
  }) => ({
    id,
    title: name,
    path: resolve(__dirname, path),
    type: PLAYER_TYPES.LOCAL,
  }))
}
