/**
 * A common dummy player choosing random empty spot on grid
 */

module.exports = async function(grid) {
  const empties = grid.reduce((accum, row, rowIdx) => {
    row.forEach((val, colIdx) => {
      if (val === 0) accum.push([rowIdx, colIdx]);
    });
    return accum;
  }, []);
  const randomVec = empties[Math.floor(empties.length * Math.random())];

  return randomVec;
};
