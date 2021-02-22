import { request } from './request'

/* eslint-disable */
export interface MatchOptions {
  grid_width: number;
  grid_height: number;
  max_rounds: number;
  num_of_games: number;
  repo_A: string;
  repo_B: string;
  winning_length: number;
}

export const submitMatch = async (options: MatchOptions) =>
  request('/match', {
    method: 'post',
    ...options,
  })
