const fs = require('fs');
const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('');

// const data = '<<<<>'.split('');

let counter = 1;
let result = 0;
let currentType = 'group';
let garbageCount = 0;

for (let i = 0; i < data.length; i++) {
  if (data[i] == '!') {
    i++;
  } else if (currentType === 'group') {
    // If parsing groups
    if (data[i] === '{') {
      result += counter;
      counter++;
    }
    if (data[i] === '}') {
      counter--;
    }
    if (data[i] === '<') {
      currentType = 'garbage';
    }
  } else {
    // If parsing garbage
    if (data[i] === '>') {
      currentType = 'group';
    } else {
      garbageCount++;
    }
  }
}

console.log('Part 1: ', result);
console.log('Part 2: ', garbageCount);
