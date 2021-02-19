import * as Assert from 'assert'
import { checkWin } from './checkWin'
import { createGrid, makeMove } from '../grid/grid'

describe('checkWin', function () {
    let grid = createGrid(5, 5)

    it('should return false for empty grid', function () {
        Assert.strictEqual(checkWin(grid, 1), false)
    })

    it('should recognize 5 in horizontal line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            makeMove(grid, 4 + i, 4, 1)
        }
        Assert.strictEqual(checkWin(grid, 1), true)
    })

    it('should recognize 5 in vertical line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            makeMove(grid, 4, 4 + i, 1)
        }
        Assert.strictEqual(checkWin(grid, 1), true)
    })

    it('should recognize 5 in diagonal line', function () {
        let grid = createGrid(10, 10)
        for (let i = 0; i < 5; i++) {
            makeMove(grid, 4 + i, 4 + i, 2)
        }
        Assert.strictEqual(checkWin(grid, 2), true)
    })
})
