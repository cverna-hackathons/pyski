import { Player } from '.';

export const createInteractivePlayer = (name: string): Player => ({
  name,
  isInteractive: true,
  async play() {
    return []
  }
})