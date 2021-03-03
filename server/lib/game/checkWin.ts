import { Grid } from "../grid/grid"

/**
 *
 * @param  {int[][]} grid
 * @param  {int} value value which we investigate of winning
 * @return {boolean}
 */
export function checkWin(
  grid: Grid,
  value: number,
  WINNING_LEN: number = 5
): boolean {
  function isCorrectPosition(x: number, y: number): boolean {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[y].length
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === value) {
        //go to right
        let rightFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x + i, y) || grid[y][x + i] !== value)
            rightFound = false
        }

        //go to right-down
        let rightDownFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x + i, y + i) || grid[y + i][x + i] !== value)
            rightDownFound = false
        }

        //go down
        let downFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x, y + i) || grid[y + i][x] !== value)
            downFound = false
        }

        //go left-down
        let leftDownFound = true
        for (let i = 1; i < WINNING_LEN; i++) {
          if (!isCorrectPosition(x - i, y + i) || grid[y + i][x - i] !== value)
            leftDownFound = false
        }

        if (rightFound || rightDownFound || downFound || leftDownFound) {
          return true
        }
      }
    }
  }
  return false
}
