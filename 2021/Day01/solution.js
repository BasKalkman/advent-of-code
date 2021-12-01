const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(Number);

let part1 = 0;
for (let i = 1; i < data.length; i++) {
  if (data[i] > data[i-1]) part1++;
}

console.log(`Part 1: ${part1}`)

// Part 2
let part2 = 0;
let currentDepth = data[0]+data[1]+data[2];
for (let i = 3; i < data.length; i++) {
  const depth = data[i] + data[i-1] + data[i-2];

  if (depth > currentDepth) part2++;

  currentDepth = depth;
}

console.log(`Part 2: ${part2}`)