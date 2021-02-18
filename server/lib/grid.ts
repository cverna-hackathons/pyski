const DEFAULT_VALUE = 0

export const defaultValue = DEFAULT_VALUE;
export type Grid = number[][];

export function createGrid(width: number, height: number): Grid {
  return Array(height)
    .fill(0)
    .map(() =>
      Array(width)
        .fill(0)
        .map(() => DEFAULT_VALUE),
    )
}

export function makeMove(
  grid: Grid,
  x: number,
  y: number,
  value: number
): Grid | undefined {
  if (grid[y][x] !== DEFAULT_VALUE) {
    return
  }

  grid[y][x] = value
  return grid
}

export function isFull(grid: Grid): boolean {
  return !toString(grid).includes(`${DEFAULT_VALUE}`)
}

export function toString(grid: Grid): string {
  return grid.reduce((result, row: number[]) => {
    result += (row.map((i: number): string => `${i}`).join(''))
    return `${result}\n`
  }, '')

}
