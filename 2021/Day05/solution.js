const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const parseNums = (line) => {
  return [x1, y1, x2, y2] = line.split(/,| -> /).map(Number)
}

const coordsList = data.map(e => parseNums(e));

// Find highest coordintae points and make grid
const [highestX, highestY] = coordsList.reduce((a,c) => {
  const [x1, y1, x2, y2] = c;
  if (x1 > a[0]) a[0] = x1
  if (x2 > a[0]) a[0] = x2
  if (y1 > a[1]) a[1] = y1
  if (y2 > a[1]) a[1] = y2
  return a;
}, [0,0])

const grid = new Array(highestY+1).fill(0).map(() => {
  return new Array(highestX+1).fill(0);
})

// Fill numbers in grid
for (const coords of coordsList) {
  const [x1, y1, x2, y2] = coords;
  const xVector = x1 > x2 ? -1 : 1
  const yVector = y1 > y2 ? -1 : 1

  if (x1===x2) {
    for (let y=y1; y !== y2 + yVector; y += yVector) {
        grid[y][x1]++
      }
  } else if (y1===y2) {
    for (let x=x1; x !== x2 + xVector; x += xVector) {
      grid[y1][x]++
    }
  } else {
    // Part 2
    for (let x=x1, y=y1; x !== x2 + xVector; x+=xVector, y+=yVector) {
      grid[y][x]++
    }
  } 
}

// Count overlaps
const overlaps = grid.flat(2).filter(e => e > 1);
console.log(overlaps.length)

