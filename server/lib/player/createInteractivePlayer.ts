import { GamePlayer } from '../game';
import { Player } from './Player.entity';

export const createInteractivePlayer = (player: Player): GamePlayer => ({
  name: player.name,
  isInteractive: true,
  play: async () => player.playInteractiveMove(),
});
