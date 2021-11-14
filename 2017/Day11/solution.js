const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split(',');

let map = {};
let x = 0;
let y = 0;

let startCoord = `x${x}y${y}`;
map[startCoord] = 1;

let furthestAway = 0;

data.forEach(step => {
  switch (step) {
    case 'n':
      y += 2;
      break;
    case 'ne':
      y += 1;
      x += 1;
      break;
    case 'nw':
      y += 1;
      x -= 1;
      break;
    case 's':
      y -= 2;
      break;
    case 'se':
      y -= 1;
      x += 1;
      break;
    case 'sw':
      y -= 1;
      x -= 1;
      break;
    default:
      console.log("default shouldn't hit");
  }

  // Write to obj
  let coord = `x${x}y${y}`;
  map[coord] = (map[coord] || 0) + 1;

  // Check furthestAway
  let numSteps = (Math.abs(x) + Math.abs(y)) / 2;
  if (numSteps > furthestAway) {
    furthestAway = numSteps;
  }
});

console.log('Part 1: ', (Math.abs(x) + Math.abs(y)) / 2);
console.log('Part 2: ', furthestAway);
