'use strict';


 /**
  * All common algorithms used as dummy players for test purposes.
  */

 module.exports = function(grid, options, done) {
   let value = options.mark;

   for (let y = 0; y < grid[0].length; y++) {
     for (let x = 0; x < grid.length; x++) {
       if (grid[x][y] === 0) done([x, y]);
     }
   }

 }
