const fs = require('fs');

const data = fs
  .readFileSync('./input.txt', { encoding: 'utf8' })
  .split('\r\n')
  .map(item => parseInt(item));

let steps = 0;
let escaped = false;
let position = 0;

while (escaped === false) {
  if (data[position] === undefined) {
    escaped = true;
    console.log(steps);
  }

  steps++;
  let jump = data[position];

  // Part 2 - For part 1, only increment by 1
  if (data[position] >= 3) {
    data[position] -= 1;
  } else {
    data[position] += 1;
  }
  position += jump;
}
