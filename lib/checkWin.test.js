const Assert = require('assert')
const { createGrid, makeMove } = require('./grid')
const checkWin = require('./checkWin')

describe('checkWin', function () {
    let grid = createGrid(5, 5)

    it('should return false for empty grid', function () {
        Assert.strictEqual(checkWin(grid, 'x'), false)
    })

    it('should recognize 5 in horizontal line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            grid = makeMove(grid, 4 + i, 4, 'x')
        }
        Assert.strictEqual(checkWin(grid, 'x'), true)
    })

    it('should recognize 5 in vertical line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            grid = makeMove(grid, 4, 4 + i, 'x')
        }
        Assert.strictEqual(checkWin(grid, 'x'), true)
    })

    it('should recognize 5 in diagonal line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            grid = makeMove(grid, 4 + i, 4 + i, 'x')
        }
        Assert.strictEqual(checkWin(grid, 'x'), true)
    })
})
