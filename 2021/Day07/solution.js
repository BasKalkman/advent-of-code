const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number);

const positions = new Set(data);

const getDiffs = (p2=false) => {
  const diffs = new Map();
  for (const position of positions) {
    const totalDistance = data.reduce((a,c) => {
      let x = Math.abs(position - c)

      if (p2) {
        let toAdd = x;
        for (let i=0; i < toAdd; i++) {
          x += i;
        }
      }

      return a + x;
    },0)
    diffs.set(position, totalDistance)
  }

  return diffs;
}

const getSmallestDistance = (list) => {
  const val = [...list.entries()].reduce((a,c) => {
    return c[1] < a[1] ? c : a;
  }, [0, Infinity])
  return val[1]
}

const diffsP1 = getDiffs();
const part1 = getSmallestDistance(diffsP1)
console.log(`Part 1: ${part1}`)

// Part 2
const diffsP2 = getDiffs(true);
const part2 = getSmallestDistance(diffsP2)
console.log(`Part 2: ${part2}`)