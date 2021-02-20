import { Player } from './Player';

export const createInteractivePlayer = (name: string): Player => ({
  name,
  isInteractive: true,
  async play() {
    return []
  }
})