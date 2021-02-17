/**
 *
 * @param  {int[][]} grid
 * @param  {int} value value which we investigate of winning
 * @return {boolean}
 */
module.exports = function(grid, value, WINNING_LEN = 5) {

  function isCorrectPosition(x, y) {
    return x >= 0 && x < grid.length && y >= 0 && y < grid[x].length;
  }

  for (let y=0; y<grid[0].length; y++) {
    for (let x=0; x<grid.length; x++) {
      if (grid[y][x] === value) {
        //go to right
        let rightFound = true;
        for (let i=1; i<WINNING_LEN; i++) {
          if (!isCorrectPosition(x+i, y) || grid[y][x+i] !== value)
            rightFound = false;
        }

        //go to right-down
        let rightDownFound = true;
        for (let i=1; i<WINNING_LEN; i++) {
          if (!isCorrectPosition(x+i, y+i) || grid[y+i][x+i] !== value)
            rightDownFound = false;
        }

        //go down
        let downFound = true;
        for (let i=1; i<WINNING_LEN; i++) {
          if (!isCorrectPosition(x, y+i) || grid[y+i][x] !== value)
            downFound = false;
        }

        //go left-down
        let leftDownFound = true;
        for (let i=1; i<WINNING_LEN; i++) {
          if (!isCorrectPosition(x-i, y+i) || grid[y+i][x-i] !== value)
            leftDownFound = false;
        }

        if (rightFound || rightDownFound || downFound || leftDownFound) {
          return true;
        }
      }
    }
  }
  return false;
}
