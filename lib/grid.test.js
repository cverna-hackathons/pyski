const Assert = require('assert')
const Grid = require('./grid')

describe('Grid', function () {
  describe('#createGrid', function () {
    it('should create empty grid 10x20', function () {
      let grid = Grid.createGrid(10, 20)
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
          Assert.strictEqual(grid[y][x], Grid.defaultValue)
        }
      }
    })
  })
  describe('#makeMove', function () {
    let grid = Grid.createGrid(5, 5)

    it('should put value on position [1,1]', function () {
      grid = Grid.makeMove(grid, 1, 1, 'x')
      Assert.strictEqual(grid[1][1], 'x')
    })

    it('should return false if try to put value on already defined [1,1]', function () {
      Assert.strictEqual(Grid.makeMove(grid, 1, 1, 'y'), false)
    })
  })

  describe('#isFull', function () {
    it('should return false for newly generated grid', function () {
      Assert.strictEqual(Grid.isFull(Grid.createGrid(2, 2)), false)
    })
    it('should return true for full grid', function () {
      let grid = Grid.createGrid(2, 2)
      grid = Grid.makeMove(grid, 0, 0, 'x')
      grid = Grid.makeMove(grid, 0, 1, 'y')
      grid = Grid.makeMove(grid, 1, 0, 'x')
      grid = Grid.makeMove(grid, 1, 1, 'y')

      Assert.strictEqual(Grid.isFull(grid), true)
    })
  })

  describe('#toString', function () {
    it('should return empty grid', function () {
      let string = Grid.toString(Grid.createGrid(2, 2))
      Assert.strictEqual(string, '00\n00')
    })

    it('should return grid with correct move', function () {
      let string = Grid.toString(
        Grid.makeMove(Grid.createGrid(2, 2), 0, 0, 'x'),
      )
      Assert.strictEqual(string, 'x0\n00')
    })
  })
})
