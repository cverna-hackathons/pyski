import * as Assert from 'assert'
import { createGrid, defaultValue, isFull, makeMove, toString } from './grid'

describe('Grid', function () {
  describe('#createGrid', function () {
    it('should create empty grid 10x20', function () {
      let grid = createGrid(10, 20)
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
          Assert.strictEqual(grid[y][x], defaultValue)
        }
      }
    })
  })
  describe('#makeMove', function () {
    let grid = createGrid(5, 5)

    it('should put value on position [1,1]', function () {
      makeMove(grid, 1, 1, 1)
      Assert.strictEqual(grid[1][1], 1)
    })

    it('should return false if try to put value on already defined [1,1]', function () {
      Assert.strictEqual(makeMove(grid, 1, 1, 2), false)
    })
  })

  describe('#isFull', function () {
    it('should return false for newly generated grid', function () {
      Assert.strictEqual(isFull(createGrid(2, 2)), false)
    })
    it('should return true for full grid', function () {
      let grid = createGrid(2, 2)

      makeMove(grid, 0, 0, 1)
      makeMove(grid, 0, 1, 2)
      makeMove(grid, 1, 0, 2)
      makeMove(grid, 1, 1, 2)

      Assert.strictEqual(isFull(grid), true)
    })
  })

  describe('#toString', function () {
    it('should return empty grid', function () {
      let string = toString(createGrid(2, 2))
      Assert.strictEqual(string, '00\n00\n')
    })

    it('should return grid with correct move', function () {
      const grid = createGrid(2, 2)
      makeMove(grid, 0, 0, 1)
      Assert.strictEqual(toString(grid), '10\n00\n')
    })
  })
})
