const fs = require('fs');
const data = fs.readFileSync('./input.txt','utf-8').split(/\r?\n/).map(e => e.split(''));
// const data = fs.readFileSync('./example.txt','utf-8').split(/\r?\n/).map(e => e.split(''));

const heightMap = new Map();
for (let y = 0; y < data.length; y++) {
  data[y].map((e,x) => heightMap.set(`${y}x${x}`, parseInt(e)))
}


// Part 1
const lowPoints = []
for (const [k,v] of [...heightMap.entries()]) {
  const diffs = [[-1,0], [0,-1], [0,1], [1,0]];
  let isLowPoint = true;
  for (const diff of diffs) {
    const [y,x] = k.split('x').map(Number)
    const [dy,dx] = diff;

    // This works
    if (heightMap.has(`${y+dy}x${x+dx}`)) {
      const val = heightMap.get(`${y+dy}x${x+dx}`)
      if (val <= v) {
        isLowPoint = false;
        break;
      }
    }

    // This doesn't
    // TODO: WHY?
    /*
    const neighborVal = heightMap.get(`${y+dy}x${x+dx}`) || null;
    if (neighborVal !== null && neighborVal <= v) {
      isLowPoint = false;
      break;
    }
    */
  }
  
  if (isLowPoint === true) {
    lowPoints.push(v+1)
  }
}

const resultP1 = lowPoints.reduce((a,c) => a + c, 0)
console.log(`Part 1: ${resultP1}`);