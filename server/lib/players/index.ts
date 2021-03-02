interface LocalPlayer {
  title: string;
  path: string;
}

export function getLocalPlayers(): LocalPlayer[] {
  return [
    {
      title: 'Alpha',
      path: 'server/lib/players/alpha.js',
    },
    {
      title: 'Dummy',
      path: 'server/lib/players/dummy.js',
    },
    {
      title: 'Random',
      path: 'server/lib/players/random.js',
    },
  ];
}
