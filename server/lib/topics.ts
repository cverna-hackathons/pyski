export enum TOPIC {
  GAME_FINISHED = 'GAME_FINISHED',
  MATCH_CREATED = 'MATCH_CREATED',
  MATCH_FINISHED = 'MATCH_FINISHED',
  MOVE_CREATED = 'MOVE_CREATED',
  LOGIN_ATTEMPT = 'LOGIN_ATTEMPT',
  SIGNUP = 'SIGNUP',
}

export type Topics = {
  [index in TOPIC]: string;
}