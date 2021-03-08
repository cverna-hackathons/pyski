import { resolve } from 'path';

interface LocalPlayer {
  title: string;
  path: string;
}

export function getLocalPlayers(): LocalPlayer[] {
  return [
    {
      title: 'Alpha',
      path: resolve(__dirname, './alpha.js'),
    },
    {
      title: 'Dummy',
      path: resolve(__dirname, './dummy.js'),
    },
    {
      title: 'Random',
      path: resolve(__dirname, './random.js'),
    },
  ];
}
