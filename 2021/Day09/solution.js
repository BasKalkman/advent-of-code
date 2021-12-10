const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split(/\r?\n/).map(e => e.split(''));
// const data = fs.readFileSync('./example.txt', 'utf-8').split(/\r?\n/).map(e => e.split(''));

const heightMap = new Map();
for (let y = 0; y < data.length; y++) {
  data[y].map((e, x) => heightMap.set(`${y}x${x}`, parseInt(e)))
}

// Part 1
const lowPoints = []
const lowPointCoords = []
for (const [k, v] of [...heightMap.entries()]) {
  const diffs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
  let isLowPoint = true;
  for (const diff of diffs) {
    const [y, x] = k.split('x').map(Number)
    const [dy, dx] = diff;

    // This works
    if (heightMap.has(`${y + dy}x${x + dx}`)) {
      const val = heightMap.get(`${y + dy}x${x + dx}`)
      if (val <= v) {
        isLowPoint = false;
        break;
      }
    }

    // This doesn't
    // WHY? - If heightMap.get returns a 0, it becomes null instead.
    // Fix by omitting the null and just deal with the get being undefined 
    /*
    const neighborVal = heightMap.get(`${y+dy}x${x+dx}`) || null;
    if (neighborVal !== null && neighborVal <= v) {
      isLowPoint = false;
      break;
    }
    */
  }

  if (isLowPoint === true) {
    lowPoints.push(v + 1)
    lowPointCoords.push(k);
  }
}


const resultP1 = lowPoints.reduce((a, c) => a + c, 0)
console.log(`Part 1: ${resultP1}`);

// Part 2
const seen = new Map();
const getBasinSize = (coords) => {
  let count = 0;
  const [y, x] = coords.split('x').map(Number);

  if (!heightMap.has(coords) || heightMap.get(coords) === 9) {
    return count;
  }

  if (seen.has(coords)) {
    return count;
  }

  count += 1;
  seen.set(coords, 1);
  const diffs = [[-1, 0], [0, -1], [1, 0], [0, 1]]
  for (const diff of diffs) {
    const [dy, dx] = diff;
    count += getBasinSize(`${y + dy}x${x + dx}`);
  }

  return count;
}

const basinSizes = lowPointCoords.map(e => getBasinSize(e));
const part2 = basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((a, c) => a * c, 1)
console.log(`Part 2: ${part2}`)