const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')

// Part 1
let part1Counter = 0;
for (const line of data) {
  const [input, output] = line.split(' | ');
  for (const digit of output.split(' ')) {
    const uniqueLengths = [2,3,4,7]
    if (uniqueLengths.includes(digit.length)) {
      part1Counter++
    }
  }
}
console.log(`Part 1: ${part1Counter}`)