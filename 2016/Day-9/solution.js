const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' });

// Part 1
let part1 = data.split('');
let result = [];

while (part1.length > 0) {
  let temp = part1.splice(0, 1)[0];
  if (temp !== '(') {
    result.push(temp);
  } else {
    let instruction = [];
    let completed = false;
    instruction.push(temp);
    while (completed === false) {
      let temp = part1.splice(0, 1)[0];
      instruction.push(temp);
      if (temp === ')') {
        completed = true;
      }
    }
    // Run
    let check = instruction
      .join('')
      .match(/\d+/g)
      .map(Number);
    let toRepeat = part1.splice(0, check[0]);
    for (let i = 0; i < check[1]; i++) {
      result.push(...toRepeat);
    }
  }
}

console.log('Part 1: ', result.length);

// Part 2
