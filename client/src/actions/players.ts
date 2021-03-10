import { request } from './request';

export interface Player {
  id: string;
  name: string;
  path: string;
  type: string;
}

export const loadPlayers = async () =>
  request<Player[]>('/players', {
    method: 'get',
  });
