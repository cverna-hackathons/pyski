/**
 * All common algorithms used as dummy players for test purposes.
 */

module.exports = async function(grid, _options) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 0) return [x, y]
    }
  }
}
