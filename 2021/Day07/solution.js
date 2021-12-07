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

const diffsP1 = getDiffs();
const part1 = [...diffsP1.entries()].reduce((a,c) => {
  return c[1] < a[1] ? c : a;
}, [0, Infinity])
console.log(`Part 1: ${part1[1]}`)

// Part 2
const diffsP2 = getDiffs(true);
const part2 = [...diffsP2.entries()].reduce((a,c) => {
  return c[1] < a[1] ? c : a;
}, [0, Infinity])
console.log(`Part 2: ${part2[1]}`)