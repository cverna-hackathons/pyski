import { GamePlayer } from '../game';

export const createInteractivePlayer = (name: string): GamePlayer => ({
  name,
  isInteractive: true,
  async play() {
    return [];
  },
});
