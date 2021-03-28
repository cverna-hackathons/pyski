process.on('message', async ({
  filePath,
  grid,
  info,
}) => {
  const play = require(filePath);
  const move = await play(grid, info);

  process.send(move);
});
