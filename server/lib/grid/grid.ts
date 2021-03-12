import { Move } from "../database/entities/Move";

const DEFAULT_VALUE = 0;

export const defaultValue = DEFAULT_VALUE;
export type Grid = number[][];

function copy(grid: Grid): Grid {
  return grid.map((line) => line.map((col) => col + 0));
}

export function createGrid(width: number, height: number): Grid {
  return Array(height)
    .fill(0)
    .map(() =>
      Array(width)
        .fill(0)
        .map(() => DEFAULT_VALUE),
    );
}

export function makeMoves(
  originalGrid: Grid,
  moves: Move[],
  firstPlayerIndex: number,
) {
  let grid = originalGrid;

  moves.forEach(move => {
    grid = makeMove(
      grid, move.x, move.y, (
        ((firstPlayerIndex + move.moveIndex) % 2) + 1
      )
    );
  });

  return grid;
}

export function makeMove(
  grid: Grid,
  x: number,
  y: number,
  value: number,
): Grid {
  if (grid[y][x] !== DEFAULT_VALUE) {
    throw new Error(`Attempting to move to a taken spot!`);
  }
  const newGrid = copy(grid);
  newGrid[y][x] = value;
  return newGrid;
}

export function isFull(grid: Grid): boolean {
  return !toString(grid).includes(`${DEFAULT_VALUE}`);
}

export function toString(grid: Grid): string {
  return grid.reduce((result, row: number[]) => {
    result += row.map((i: number): string => `${i}`).join('');
    return `${result}\n`;
  }, '');
}
