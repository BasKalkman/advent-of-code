const fs = require('fs')
const data = fs.readFileSync('./input.txt', 'utf-8').split(',').map(Number);

const positions = new Set(data);
const diffs = new Map();
for (const position of positions) {
  const totalDistance = data.reduce((a,c) => {
    const x = Math.abs(position - c)
    return a + x;
  },0)
  diffs.set(position, totalDistance)
}

const part1 = [...diffs.entries()].reduce((a,c) => {
  return c[1] < a[1] ? c : a;
}, [0, Infinity])
console.log(part1)