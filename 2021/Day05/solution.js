const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const parseAndSortNums = (line) => {
  const [x1, y1, x2, y2] = line.split(/,| -> /).map(Number)
  const xCoords = [x1,x2].sort((a,b) => a-b);
  const yCoords = [y1,y2].sort((a,b) => a-b);
  return {xCoords, yCoords}
}

const coordsList = data.map(e => parseAndSortNums(e));

// Find highest coordintae points and make grid
const [highestX, highestY] = coordsList.reduce((a,c) => {
  const {xCoords,yCoords} = c;
  if (xCoords[1] > a[0]) a[0] = xCoords[1];
  if (yCoords[1] > a[1]) a[1] = yCoords[1];
  return a;
}, [0,0])

const grid = new Array(highestY).fill(0).map(() => {
  return new Array(highestX).fill(0);
})

// Fill numbers in grid
for (const coords of coordsList) {
  const {xCoords,yCoords} = coords;
  const [xMin, xMax] = xCoords;
  const [yMin, yMax] = yCoords;

  if (xMin===xMax || yMin === yMax) {
    for (let y=yMin; y <= yMax; y++) {
      for (let x=xMin; x <= xMax; x++) {
        grid[y][x]++
      }
    }
  }  
}

// Count overlaps
const overlaps = grid.flat(2).filter(e => e > 1);
console.log(`Part 1: ${overlaps.length}`)

